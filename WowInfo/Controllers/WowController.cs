using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using Newtonsoft.Json;
using WowInfo.Models;
using WowInfo.Helpers;
using Microsoft.Extensions.Configuration;

namespace WowInfo.Controllers
{
    [ApiController]
    public class WowController : ControllerBase
    {
        /// <summary>
        /// Config object for appsettings
        /// </summary>
        private readonly IConfiguration _config;

        /// <summary>
        /// WoW API Creds
        /// </summary>
        private string CLIENT_CREDENTIALS { get; set; }

        /// <summary>
        /// Redirect URL - This project Dev URL
        /// </summary>
        private string REDIRECT_URL { get; set; }

        /// <summary>
        /// Base WoW Api URL
        /// </summary>
        private string BASE_API_URL { get; set; }


        public WowController(IConfiguration config)
        {
            _config = config;
            CLIENT_CREDENTIALS = _config.GetValue<string>("ClientCredentials");
            REDIRECT_URL = _config.GetValue<string>("RedirectUrl");
            BASE_API_URL = _config.GetValue<string>("BaseApiUrl");
        }


        /// <summary>
        /// Get Access Token - Entry Point
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [Route("api/token/{code}")]
        public IActionResult RedeemCoded(string code)
        {
            // Check Token Expiry - return OK if we have a valid token in user session
            if(!string.IsNullOrWhiteSpace(HttpContext.Session.GetString("token")) && WowApiHelper.CheckTokenExpiry(HttpContext.Session.GetString("expiry")))
            {
                return Ok("Valid token exists.");
            }

            // Continue to get new Token if Token is Null or Expired
            WowAccessToken tokenResponse = GetToken(code);

            if(!string.IsNullOrWhiteSpace(tokenResponse.AccessToken) && string.IsNullOrWhiteSpace(tokenResponse.Error))
            {
                tokenResponse.SetTokenExpiryTime();

                // Set Session Storage of User Token / Expiry
                HttpContext.Session.SetString("token", tokenResponse.AccessToken);
                HttpContext.Session.SetString("expiry", tokenResponse.ExpiryTime.ToString());

                return Ok("Token granted.");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, tokenResponse);
            }
        }

        /// <summary>
        /// Get Access Token - WoW API Call
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private WowAccessToken GetToken(string code)
        {
            string tokenUrl = "https://us.battle.net/oauth/token";

            var client = new RestClient(tokenUrl);
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Authorization", $"Basic {CLIENT_CREDENTIALS}");

            request.AlwaysMultipartFormData = true;
            request.AddParameter("grant_type", "authorization_code");
            request.AddParameter("scope", "wow.profile");
            request.AddParameter("redirect_uri", REDIRECT_URL);
            request.AddParameter("code", code);
            IRestResponse response = client.Execute(request);

            return JsonConvert.DeserializeObject<WowAccessToken>(response.Content);
        }

        /// <summary>
        /// Get WoW Characters from Profile Response
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [Route("api/characters")]
        public IActionResult GetCharacters()
        {
            // Check if token is in session
            string token = HttpContext.Session.GetString("token");
            if(string.IsNullOrWhiteSpace(token) || !WowApiHelper.CheckTokenExpiry(HttpContext.Session.GetString("expiry")))
            {
                return Redirect(Url.Content("~/"));
            }

            var client = new RestClient($"{BASE_API_URL}/profile/user/wow?locale=en_US&namespace=profile-us");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", $"Bearer {token}");
            IRestResponse response = client.Execute(request);

            WowProfile profileResponse = JsonConvert.DeserializeObject<WowProfile>(response.Content);

            return Ok(profileResponse);
        }
    }
}

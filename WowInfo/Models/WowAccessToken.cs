using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WowInfo.Models
{
    public class WowAccessToken
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }

        [JsonProperty("scope")]
        public string Scope { get; set; }

        [JsonProperty("error")]
        public string Error { get; set; }

        [JsonProperty("error_description")]
        public string ErrorDescription { get; set; }

        public DateTime ExpiryTime { get; set; }

        /// <summary>
        /// Method to set expiry time
        /// </summary>
        public void SetTokenExpiryTime()
        {
            this.ExpiryTime = DateTime.Now.AddSeconds(this.ExpiresIn);
        }
    }
}

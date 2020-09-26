using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WowInfo.Models;

namespace WowInfo.Helpers
{
    public class WowApiHelper
    {
        /// <summary>
        /// Method to check access token expiry time
        /// Checks token expiry stored in user's session
        /// </summary>
        /// <param name="expiryTime"></param>
        /// <returns></returns>
        internal static bool CheckTokenExpiry(string expiryTime)
        {
            var diffInSeconds = (Convert.ToDateTime(expiryTime) - DateTime.Now).TotalSeconds;
            return (diffInSeconds > 3) ? true : false;
        }
    }


}

namespace TripExchange.Web.Models.Users
{
    using System.Collections.Generic;
    using TripExchange.Models;

    public class UserInfoViewModel
    {
        public string Email { get; set; }

        public bool IsDriver { get; set; }

        public string Car { get; set; }

        public IEnumerable<string> Images { get; set; }
    }
}
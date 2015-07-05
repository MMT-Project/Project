using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using TripExchange.Data;

namespace TripExchange.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/images")]
    public class ImagesController : BaseApiController
    {
        public ImagesController()
            : base(new TripExchangeData())
        {
        }

        // GET api/<controller>
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        public IHttpActionResult Get(string email)
        {
            email = string.IsNullOrEmpty(email) || email == "undefined" ? User.Identity.GetUserName() : email;

            ////var db = new ApplicationDbContext();
            var user = this.Data.Users.All().FirstOrDefault(u => u.UserName == email);// db.Users.FirstOrDefault(x => x.UserName == email);

            if (user == null)
            {
                return this.BadRequest(string.Format("Username {0} not found", email));
            }

            return
                this.Ok(user.Images.Select(i => i.FilePath));
        }
    }
}
namespace TripExchange.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    public class Image
    {
        public Image()
        {
            this.ImageId = Guid.NewGuid();
        }

        [Key]
        public Guid ImageId { get; set; }

        public string FilePath { get; set; }

        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}
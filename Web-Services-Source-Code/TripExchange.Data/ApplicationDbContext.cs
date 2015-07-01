﻿namespace TripExchange.Data
{
    using System.Data.Entity;

    using Microsoft.AspNet.Identity.EntityFramework;

    using TripExchange.Models;
    using TripExchange.Data.Migrations;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());
        }

        public IDbSet<Trip> Trips { get; set; }

        public IDbSet<City> Cities { get; set; }

        public IDbSet<Image> Images { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Trip>()
                .HasRequired(m => m.Driver)
                .WithMany(m => m.TripsWhereDriver)
                .HasForeignKey(m => m.DriverId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Trip>()
                .HasMany(m => m.Passengers)
                .WithMany(m => m.Trips);

            //modelBuilder.Entity<Image>()
            //    .HasRequired(i => i.User)
            //    .WithMany(i => i.Images)
            //    .HasForeignKey(i => i.UserId)
            //    .WillCascadeOnDelete(false);
        }
    }
}
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SchedulerR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerR.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Tournament> Tournaments { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Tournament>()
                    .HasMany(c => c.Classes)
                    .WithOne(t => t.Tournament)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Tournament>()
                .HasMany(c => c.Courts)
                    .WithOne(t => t.Tournament)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Tournament>()
                .HasMany(c => c.PlayingDates)
                    .WithOne(t => t.Tournament)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Tournament>()
                .HasMany(c => c.Matches)
                    .WithOne(t => t.Tournament)
                    .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Class>()
               .HasMany(c => c.Matches)
                   .WithOne(t => t.Class)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Class>()
                .HasOne(c => c.Tournament)
                    .WithMany(t => t.Classes)
                    .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Court>()
               .HasOne(c => c.Tournament)
                   .WithMany(t => t.Courts)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Court>()
               .HasMany(c => c.Matches)
                   .WithOne(t => t.Court)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<PlayingDate>()
               .HasOne(c => c.Tournament)
                   .WithMany(t => t.PlayingDates)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<PlayingDate>()
               .HasMany(c => c.Matches)
                   .WithOne(t => t.PlayingDate)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Match>()
               .HasOne(c => c.Tournament)
                   .WithMany(t => t.Matches)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Match>()
               .HasOne(c => c.Class)
                   .WithMany(t => t.Matches)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Match>()
               .HasOne(c => c.Court)
                   .WithMany(t => t.Matches)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Match>()
               .HasOne(c => c.PlayingDate)
                   .WithMany(t => t.Matches)
                   .OnDelete(DeleteBehavior.NoAction);

            //builder.Entity<Class>()
            //   .HasMany(c => c.PlayingDates)
            //       .WithMany(t => t.Classes);





            base.OnModelCreating(builder);
        }

    }
}

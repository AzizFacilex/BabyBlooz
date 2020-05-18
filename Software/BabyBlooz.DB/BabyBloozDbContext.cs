using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using BabyBlooz.DB.Entities;

namespace BabyBlooz.DB

{
    public class BabyBloozDbContext : DbContext
    {
        public BabyBloozDbContext(DbContextOptions<BabyBloozDbContext> options)
            : base(options)
        { }
        public BabyBloozDbContext() { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Server=localhost;database=BabyBloozDB;Uid=testuser;Pwd=testpassword");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LilypadUser>().HasKey(bc => new { bc.LilypadId, bc.UserId });
            modelBuilder.Entity<LilypadUser>()
                .HasOne(bc => bc.Lilypad)
                .WithMany(b => b.LilypadUsers)
                .HasForeignKey(bc => bc.LilypadId);
            modelBuilder.Entity<LilypadUser>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.LilypadUsers)
                .HasForeignKey(bc => bc.UserId);
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Lilypad> Lilypads { get; set; }
        public DbSet<Data> Datas { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Wifi> Wifis { get; set; }


    }

}

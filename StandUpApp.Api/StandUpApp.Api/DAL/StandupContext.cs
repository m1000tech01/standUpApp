using System;
using Microsoft.EntityFrameworkCore;
using StandUpApp.Api.Models;

namespace StandUpApp.Api.DAL
{
    public class StandupContext : DbContext // inherits DbContext, 
    {
        public DbSet<NoteModel> Notes { get; set; }  //we create the classes here which are translated into tables in a database.
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<LabelsModel> Labels { get; set; }
        public DbSet<FolderModel> Folders { get; set; }
        public StandupContext(DbContextOptions <StandupContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NoteModel>();

        }
    }
}

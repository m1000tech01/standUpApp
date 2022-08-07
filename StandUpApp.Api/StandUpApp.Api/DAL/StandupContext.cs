using System;
using System.Threading.Tasks;
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
            modelBuilder.Entity<FolderModel>().HasData(new FolderModel {
                 Id = 1,
                 Name = "Root",
                 CreationDate = DateTime.Now,
                 CreatedBy = "Jaz",
                 ParentID = 0,
                 ModificationDate = DateTime.Now,
            });
               
            modelBuilder.Entity<NoteModel>().HasData(new NoteModel
            {

                Id = 1,
                Author = "Jaz",
                CreatedBy = "Jaz",
                CreationDate = DateTime.Now,
                FolderId = 1,
                ModificationDate = DateTime.Now,
                ModifiedBy = "Jaz",
                Name = "Scripted Test note",
                Text = "Welcome to the note generated in C# code"


            }) ;

        }

        internal Task FirstOrDefaultAsync(Func<object, bool> p)
        {
            throw new NotImplementedException();
        }
    }
}

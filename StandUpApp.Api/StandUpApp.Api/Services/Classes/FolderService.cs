using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StandUpApp.Api.DAL;
using StandUpApp.Api.Models;
using StandUpApp.Api.Services.Interfaces;

namespace StandUpApp.Api.Services.Classes
{
    public class FolderService : IFolderService
    {
        private readonly StandupContext _context;
        public FolderService(StandupContext context)
        {
            _context = context; //create the context
        }

        public async Task<int> AddFolderToRoot(string foldername)
        {
            var root = await _context.Folders.FirstOrDefaultAsync(); 

            FolderModel folder = new FolderModel();
            folder.CreationDate = DateTime.Now;
            folder.ModificationDate = DateTime.Now;
            folder.CreatedBy = "System";
            folder.Name = foldername;
            folder.ParentID = root.Id;
            await _context.Folders.AddAsync(folder);
            await _context.SaveChangesAsync();

            return folder.Id;
        }

        public async Task<int?> GetRootId()
        {
            var folder = await _context.Folders.FirstOrDefaultAsync(x => x.Name.ToLower() == "root");
            return folder?.Id;
            
        }
    }
}

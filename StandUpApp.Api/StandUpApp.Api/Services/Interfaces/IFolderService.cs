using System;
using System.Threading.Tasks;

namespace StandUpApp.Api.Services.Interfaces
{
    public interface IFolderService
    {
        Task<int> AddFolderToRoot(string foldername);
        Task<int?> GetRootId();
    }
}

using System;
using System.Collections.Generic;

namespace StandUpApp.Api.Models
{
    public class FolderModel: BaseHistory
    {
        public FolderModel()
        {
            Children = new List<FolderModel>();
        }
        public string Name { get; set; }
        public int? ParentID { get; set; }
        public FolderModel Parent { get; set; }
        public List <FolderModel> Children { get; set; }
        public List<NoteModel> Notes { get; set; }
    }
}

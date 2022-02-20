using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StandUpApp.Api.ViewModels
{
    public class BaseHistoryViewModel
    {
            public int Id { get; set; }
            public DateTime CreationDate { get; set; }
            public DateTime ModificationDate { get; set; }
            public string CreatedBy { get; set; }
            public string ModifiedBy { get; set; }
    }
}

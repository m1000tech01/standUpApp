using System;
using System.Collections.Generic;

namespace StandUpApp.Api.ViewModels
{
    public class ChildViewModel
    {
        public string name { get; set; }
        public int id { get; set; }
        public bool isfolder { get; set; }
        public List<ChildViewModel> child { get; set; }
       
    }
}

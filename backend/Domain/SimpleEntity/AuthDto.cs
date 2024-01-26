using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.SimpleEntity
{
    public class AuthDto
    {
        public string ClientUrl { get; set; }
        public BaseUser User { get; set; }
    }
}

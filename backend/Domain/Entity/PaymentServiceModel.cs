using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class PaymentServiceModel
    {
        public string DisplayName { get; set; }
        public string PaymentServiceKey { get; set; }
        public string ShopId { get; set; }
        public string? SecretKey { get; set; }
        public string ImageUrl { get; set; }
    }
}

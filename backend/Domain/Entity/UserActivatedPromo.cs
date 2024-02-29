using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class UserActivatedPromo
    {
        public string PromoCode { get; set; }
        public int MoneyValue { get; set; }
        public int DiscountValue { get; set; }
        public DateTime? DateActivate { get; set; }
    }
}

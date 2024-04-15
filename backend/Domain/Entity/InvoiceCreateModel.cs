using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity
{
    public class InvoiceCreateModel
    {
        public string PaymentServiceKey { get; set; }
        public decimal Amount { get; set; }
        public string SteamId { get; set; }
        public string SteamName { get; set;}
        public int OrderId { get; set; }
        public int? CurrenciesID {  get; set; }
    }
}

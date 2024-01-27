using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.PaymentServicesModels
{
    public class LavaModel
    {
        public float Sum { get; set; }
        public string OrderId { get; set; }
        public string ShopId { get; set; }
        public string HookUrl { get; set; }
        public string? FailUrl { get; set; }
        public string? SuccessUrl { get; set; }
        
        //  Время жизни инвойса
        public int Expire { get; set; }
        public string CustomFields { get; set; }
        public string Comment { get; set; }

        // Методы оплаты доступные на странице счёта
        public List<string>? IncludeService { get; set; }

        // Методы оплаты доступные на странице счёта
        public List<string>? ExcludeService { get; set; }

    }
}

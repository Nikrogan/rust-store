using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentAdapter
{
    public class PaymentServiceAdapter : IPayment
    {
        private readonly IPayment _paymentService;

        public PaymentServiceAdapter(IPayment paymentService)
        {
            _paymentService = paymentService;
        }

        public async Task<string> ProcessPayment(InvoiceCreateModel paymentCreateModel)
        {
            Console.WriteLine("Подготовка к оплате...");

            // Вызываем метод обработки оплаты у конкретного платежного сервиса
            return await _paymentService.ProcessPayment(paymentCreateModel);
        }

    }
}

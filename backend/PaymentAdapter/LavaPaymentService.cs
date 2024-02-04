using Domain.Entity;
using Domain.PaymentServicesModels;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace PaymentAdapter
{
    public class LavaPaymentService : IPayment
    {
        public async Task<string?> ProcessPayment(InvoiceCreateModel invoiceCreateModel)
        {
            Console.WriteLine($"Создание invoce через Lava на сумму {invoiceCreateModel.Amount}");

            var serviceModel = invoiceCreateModel.PaymentServiceModel;
            if (serviceModel == null) return null;

            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("backendUrl");
            //var link = "хуй соси";

            LavaModel apiInvoiceCreateModel = new LavaModel() {
                Sum = float.Parse(invoiceCreateModel.Amount.ToString()),
                OrderId = invoiceCreateModel.OrderId.ToString(),
                ShopId = serviceModel.ShopId,
                HookUrl = "34",
                FailUrl = "34",
                SuccessUrl = "34",
                Expire = 3600,
                CustomFields = invoiceCreateModel.SteamId,
                Comment = "Оплата услуг интернет магазина RustStore",
            };

            var serializeData = JsonSerializer.Serialize(apiInvoiceCreateModel);
            UTF8Encoding encoding = new UTF8Encoding();
            byte[] data = encoding.GetBytes(serializeData);
            byte[] key = encoding.GetBytes(serviceModel.SecretKey);
            var hash = new HMACSHA256(key);
            var hashmessage = hash.ComputeHash(data);
            string signature = Convert.ToBase64String(hashmessage);

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.lava.ru/business/invoice/create");

            request.Headers.Add("Accept","application / json");
            request.Headers.Add("Content - Type","application / json");
            request.Headers.Add("Signature", signature);

            request.Content = new StringContent(serializeData, Encoding.UTF8);

            HttpClient httpClient = new HttpClient();
            var response = await httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {

                string str = await response.Content.ReadAsStringAsync();

                throw new Exception("Response is " + str + "\r\n" + "Code is " + response.StatusCode);
            }

            string responseMessage = response.Content.ReadAsStringAsync().Result;


            return "invoice";
        }
    }
}

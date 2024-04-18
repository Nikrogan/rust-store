using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PaymentServiceManager
{
    public class FreeKassaApi
    {
        public static async Task<InvoiceResponse?> GetInvoice(InvoiceCreateModel invoiceCreateModel)
        {
            var paymentServiceConfigModel = await ConfigManager.GetPaymentConfig("custom_freekassa");
           // var client = await CreateClient();

            string apiUrl = "https://api.freekassa.ru/v1/orders/create";
            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("backendUrl");

            var freeKassaKey = (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds;

            Dictionary<string, object> data = new Dictionary<string, object>
        {
            { "shopId", paymentServiceConfigModel.ShopId },
            { "nonce", freeKassaKey },
                {"paymentId", invoiceCreateModel.OrderId },
                {"i", 6 },
                {"email", "azorety180@gmail.com" },
                {"ip", IPAddress.Any},
                {"amount", invoiceCreateModel.Amount },
                {"currency", "RUB" }
        };

            string dataString = String.Join("|", SortedDictionary(data).Select(kv => $"{kv.Key}={kv.Value}"));
            string signature = ComputeHMACSHA256(dataString, paymentServiceConfigModel.AdditionalKey);
            data.Add("signature", signature);

            string jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(data);

            using (WebClient client = new WebClient())
            {
                client.Headers[HttpRequestHeader.ContentType] = "application/json";
                string result = client.UploadString(apiUrl, jsonRequest);
                dynamic response = Newtonsoft.Json.JsonConvert.DeserializeObject(result);
                Console.WriteLine(response);
            }

        }

        public static async Task<object> GetCurrencies()
        {
            var paymentServiceConfigModel = await ConfigManager.GetPaymentConfig("custom_freekassa");

            string apiUrl = "https://api.freekassa.ru/v1/currencies";
            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("backendUrl");

            var freeKassaKey = (int)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds;

            Dictionary<string, object> data = new Dictionary<string, object>
            {
                { "shopId", paymentServiceConfigModel.ShopId },
                { "nonce", freeKassaKey }
            };

            string dataString = String.Join("|", SortedDictionary(data).Select(kv => $"{kv.Key}={kv.Value}"));
            string signature = ComputeHMACSHA256(dataString, paymentServiceConfigModel.AdditionalKey);
            data.Add("signature", signature);

            string jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(data);

            using (WebClient client = new WebClient())
            {
                client.Headers[HttpRequestHeader.ContentType] = "application/json";
                string result = client.UploadString(apiUrl, jsonRequest);
                dynamic response = Newtonsoft.Json.JsonConvert.DeserializeObject(result);
                return response;
            }
        }

        private static string ComputeHMACSHA256(string message, string apiKey)
        {
            byte[] keyBytes = Encoding.UTF8.GetBytes(apiKey);
            using (HMACSHA256 hmac = new HMACSHA256(keyBytes))
            {
                byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }

        private static SortedDictionary<string, object> SortedDictionary(Dictionary<string, object> dictionary)
        {
            return new SortedDictionary<string, object>(dictionary, StringComparer.Ordinal);
        }
    }
}

using Domain.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace PaymentServiceManager
{
    public class TomeApi
    {
        public static async Task<InvoiceResponse?> GetInvoice(InvoiceCreateModel invoiceCreateModel)
        {
            var paymentServiceConfigModel = await ConfigManager.GetPaymentConfig("custom_tome");
            // var client = await CreateClient();

            string apiUrl = "https://tome.ge/api/v1/payments";
            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("backendUrl");

            string shopId = paymentServiceConfigModel.ShopId;
            string secretKey = paymentServiceConfigModel.SecretKey;

            var requestBody = new
            {
                amount = new { value = invoiceCreateModel.Amount.ToString(), currency = "RUB" },
                confirmation = new { type = "redirect", return_url = link + "/paymentservices/tome_redirect" },
                description = "Пополнение баланса BWRUST",
                metadata = new
                {
                    order_id = invoiceCreateModel.OrderId,
                    steamId = invoiceCreateModel.SteamId
                }
            };
            string jsonBody = JsonConvert.SerializeObject(requestBody);

            using (var client = new HttpClient())
            {
                var authValue = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes($"{shopId}:{secretKey}")));
                client.DefaultRequestHeaders.Authorization = authValue;

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    dynamic responseData = JsonConvert.DeserializeObject(responseBody);

                    if (responseData?.status == "pending")
                    {
                        string invoiceLink = responseData.confirmation.confirmation_url;
                        string serviceOrderId = responseData.id;
                        if (!string.IsNullOrEmpty(invoiceLink) && !string.IsNullOrEmpty(serviceOrderId))
                        {
                            return new InvoiceResponse
                            {
                                InvoiceUrl = invoiceLink,
                                ServiceOrderId = serviceOrderId
                            };
                        }
                    }
                }
                else
                {
                    return null;
                }
            }
            return null;


        }
   
        public static async Task<bool> IsSucceeded(string orederId)
        {
            var paymentServiceConfigModel = await ConfigManager.GetPaymentConfig("custom_tome");
            // var client = await CreateClient();

            string apiUrl = "https://tome.ge/api/v1/payments/"+orederId;
            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("backendUrl");

            string shopId = paymentServiceConfigModel.ShopId;
            string secretKey = paymentServiceConfigModel.SecretKey;

            using (var client = new HttpClient())
            {
                var authValue = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.UTF8.GetBytes($"{shopId}:{secretKey}")));
                client.DefaultRequestHeaders.Authorization = authValue;

                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    dynamic responseData = JsonConvert.DeserializeObject(responseBody);

                    try
                    {
                        var status = responseData.status;
                        if (status == "succeeded")
                            return true;
                        else
                            return false;
                    }
                    catch
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            return false;
        }
    }
}

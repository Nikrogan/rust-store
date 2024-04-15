using Domain.Entity;
using Domain.Enum;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text;

namespace PaymentServiceManager
{
    public static class PayPalApi
    {
        public static async Task<InvoiceResponse?> GetInvoice(InvoiceCreateModel invoiceCreateModel)
        {
            var client = await CreateClient();

            string apiUrl = "https://api-m.sandbox.paypal.com/v2/checkout/orders";
            DotNetEnv.Env.Load();
            var link = Environment.GetEnvironmentVariable("backendUrl");

            var requestData = new
            {
                intent = "CAPTURE",
                purchase_units = new[]
                {
                    new
                    {
                        //reference_id = "d9f80740-38f0-11e8-b467-0ed5f89f718b",
                        amount = new
                        {
                            currency_code = "USD",
                            value = invoiceCreateModel.Amount
                        }
                    }
                },
                payment_source = new
                {
                    paypal = new
                    {
                        experience_context = new
                        {
                            brand_name = "blackwood rust",
                            user_action = "PAY_NOW",
                            payment_method_preference = "IMMEDIATE_PAYMENT_REQUIRED",
                            locale = "en-US",
                            return_url = $"{link}/api/v1/paymentservices/paypal_success",
                            cancel_url = $"{link}/api/v1/paymentservices/paypal_cancel"
                        }
                    }
                    //card = new
                    //{

                    //}

                }

            };

            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(requestData);
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync(apiUrl, content);
            client.Dispose();

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                JObject jsonResponse = JObject.Parse(responseBody);

                string invoiceLink = jsonResponse["links"]
                    .FirstOrDefault(link => link["rel"].ToString() == "payer-action")?["href"]?.ToString();

                string serviceOrderId = jsonResponse["id"].ToString();


                if (!string.IsNullOrEmpty(invoiceLink) && !string.IsNullOrEmpty(serviceOrderId))
                {
                    return new InvoiceResponse 
                    {
                        InvoiceUrl = invoiceLink,
                        ServiceOrderId = serviceOrderId
                    };
                }
                else
                    return null;
            }
            else
                Console.WriteLine($"Ошибка запроса к PayPal API: {response.StatusCode} - {response.ReasonPhrase}");
                
            return null;
        }

        public static async Task<PaymentStatus> CheckStatus(string token)
        {
            var client = await CreateClient();
            string apiUrl = "https://api.sandbox.paypal.com/v2/checkout/orders/" + token + "/capture";
            var content = new StringContent(string.Empty, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync(apiUrl, content);
            client.Dispose();

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                JObject jsonResponse = JObject.Parse(responseBody);

                string invoiceLink = jsonResponse["status"].ToString();

                if (invoiceLink == "COMPLETED")
                {
                    return PaymentStatus.Succeeded;
                }
                return PaymentStatus.Canceled;
            }
            else
            {
                // Обработайте ошибку, если запрос не успешен
                Console.WriteLine($"Ошибка запроса к PayPal API: {response.StatusCode} - {response.ReasonPhrase}");
            }
            
            return PaymentStatus.Pending;
        }

        private static async Task<HttpClient> CreateClient()
        {
            var paymentServiceConfigModel = await ConfigManager.GetPaymentConfig("custom_paypal");
            var accessToken = await GetAccessToken(paymentServiceConfigModel.SecretKey, paymentServiceConfigModel.AdditionalKey);
            string accessTokenHeader = $"Bearer {accessToken}";

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", accessTokenHeader);

            return client;
        }

        private static async Task<string> GetAccessToken(string clientSecret, string clientId)
        {
            using HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("https://api-m.sandbox.paypal.com");

            var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);

            var formData = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials")
                });

            HttpResponseMessage response = await client.PostAsync("/v1/oauth2/token", formData);

            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                JObject jsonResponse = JObject.Parse(responseBody);

                string accessToken = jsonResponse["access_token"].ToString();

                return accessToken;
            }
            else
            {
                Console.WriteLine($"Ошибка запроса к PayPal API: {response.StatusCode} - {response.ReasonPhrase}");
                return null;
            }
        }
    }
}

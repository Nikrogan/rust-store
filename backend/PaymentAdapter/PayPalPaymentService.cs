using Domain.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace PaymentAdapter
{
    public class PayPalPaymentService : IPayment
    {
        public async Task<string?> ProcessPayment(InvoiceCreateModel invoiceCreateModel)
        {
            var accessToken = await GetAccessToken(invoiceCreateModel.PaymentServiceModel.SecretKey, invoiceCreateModel.PaymentServiceModel.AdditionalKey);

            string apiUrl = "https://api-m.paypal.com/v2/checkout/orders";
            string accessTokenHeader = $"Bearer {accessToken}";

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
                        card = new
                        {

                        }
                    }
                }
            };

            using (HttpClient client = new HttpClient())
            {
                //client.DefaultRequestHeaders.Add("Content-Type", "application/json");
                client.DefaultRequestHeaders.Add("Authorization", accessTokenHeader);

                string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(requestData);
                var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    // Обработайте успешный ответ
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Успешный ответ от PayPal API:");
                    Console.WriteLine(responseBody);
                    JObject jsonResponse = JObject.Parse(responseBody);


                    string invoiceLink = jsonResponse["links"]
                        .FirstOrDefault(link => link["rel"].ToString() == "payer-action")?["href"]?.ToString();

                    if (!string.IsNullOrEmpty(invoiceLink))
                    {
                        return invoiceLink;
                    }
                    else
                    {
                        return "empty";
                    }
                }
                else
                {
                    // Обработайте ошибку, если запрос не успешен
                    Console.WriteLine($"Ошибка запроса к PayPal API: {response.StatusCode} - {response.ReasonPhrase}");
                }
            }

            return "empty";
        }

        private async Task<string> GetAccessToken(string clientSecret, string clientId)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://api-m.paypal.com");

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
}

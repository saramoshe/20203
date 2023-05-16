using Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace _20203.Controllers
{
    [Route("api")]
    [ApiController]
    public class MyController : ControllerBase
    {
        static DateTime _lastRequest;
        [HttpPost]
        [Route("send-email-to-server")]
        public IActionResult SendEmailToServer([FromBody] EmailRequest emailRequst)
        {
            try
            {
                if(_lastRequest.AddSeconds(3) > DateTime.Now)
                    return StatusCode(StatusCodes.Status429TooManyRequests, "");

                _lastRequest = DateTime.Now;
                MyServerResponse res = new MyServerResponse() { EmailAddress = emailRequst.EmailAddress, ExactTime = DateTime.Now };
                return Ok(res);
            }
            catch (Exception e)
            {
            }
            return StatusCode(StatusCodes.Status500InternalServerError, "");
        }
    }
}

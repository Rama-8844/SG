using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApiSolution.Models;

namespace WebApiSolution.Controllers
{
    [RoutePrefix("Api/Values")]
    public class ValuesController : ApiController
    {
        IItemRepository _items = new MockItemRespository();

        //private  readonly IItemRepository _items;
        //public ValuesController(IItemRepository itemRepository)
        //{
        //    this._items = itemRepository;
        //}

        // GET api/values
        [HttpGet]
        public IEnumerable<Item> GetItems()
        {
            using(ShoppingCartEntities itms = new ShoppingCartEntities())
            {
                return itms.Items.ToList();
            }
            
        }

        // POST api/values
        public HttpResponseMessage Post([FromBody]Item item)
        {
            using (ShoppingCartEntities itms = new ShoppingCartEntities())
            {
                itms.Items.Add(item);
                itms.SaveChanges();
               return Request.CreateResponse(HttpStatusCode.Created);
            }
        }

        // PUT api/values/5
        public HttpResponseMessage Put(int id, [FromBody]Item itm)
        {
            using (ShoppingCartEntities itms = new ShoppingCartEntities())
            {
                var item = itms.Items.FirstOrDefault(i => i.Item_ID == id);
                if(item==null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,id.ToString());
                }
                else {
                    item.Item_Name = itm.Item_Name;
                    item.Description = itm.Description;
                    item.Price = itm.Price;
                    itms.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK,item);
                }
               
            }

        }

        // DELETE api/values/5
        public HttpResponseMessage Delete(int id)
        {
            using (ShoppingCartEntities itms = new ShoppingCartEntities())
            {
                Item item = itms.Items.FirstOrDefault(i => i.Item_ID == id);
                if (item != null)
                {
                    itms.Items.Remove(item);
                    itms.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                   return Request.CreateResponse(HttpStatusCode.NotFound, id.ToString());
                }
            }
        }
        public Item GetByID(int id)
        {
            using (ShoppingCartEntities itms = new ShoppingCartEntities())
            {
                Item item = itms.Items.FirstOrDefault(i => i.Item_ID == id);
                
                    return item;
            }
        }
    }
}

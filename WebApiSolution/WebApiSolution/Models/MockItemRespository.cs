using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace WebApiSolution.Models
{
    public class MockItemRespository : IItemRepository
    {
        private List<Item> _items;
        public MockItemRespository()
        {
            _items = new List<Item>()
           {
               new Item()
               {
                   Item_ID=1,Item_Name="Dress", Description="Dress Material", Price=200
               },
               new Item()
               {
                    Item_ID=2,Item_Name="Shoes", Description="Shoe", Price=300
               }
           }; 
        }
        public Item AddItem(Item item)
        {
            _items.Add(item);
            return item;
        }

        public Item DeleteItem(int id)
        {
            Item item = _items.FirstOrDefault(i=>i.Item_ID == id);
            if (item != null)
            {
                _items.Remove(item);
            }
            return item;
        }

        public IEnumerable<Item> GetAllItems()
        {
            return _items;
        }

        public Item GetItembyID(int id)
        {
            Item item = _items.FirstOrDefault(i => i.Item_ID == id);
            if (item != null)
            {
                return item;
            }
            else
            {
                return null;
            }
        }

        public Item UpdateItem(int id,Item item)
        {
            Item itm = _items.FirstOrDefault(i => i.Item_ID == id);
            if (item != null)
            {
                itm.Item_Name = item.Item_Name;
                itm.Description = item.Description;
                itm.Price = item.Price;
            }
            return itm;
        }
    }
}
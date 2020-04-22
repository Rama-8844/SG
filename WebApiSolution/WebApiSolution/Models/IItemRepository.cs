using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiSolution.Models
{
    public interface IItemRepository
    {
        IEnumerable<Item> GetAllItems();
        Item GetItembyID(int id);
        Item AddItem(Item item);
        Item UpdateItem(int id,Item item);
        Item DeleteItem(int id);
    }
}

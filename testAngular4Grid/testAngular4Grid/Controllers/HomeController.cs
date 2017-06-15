using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace testAngular4Grid.Controllers
{
    public class HomeController : Controller
    {
        #region Model
        public class GridData
        {
            public int Id { get; set; }
            public string name { get; set; }
            public string jobTitle { get; set; }
            public bool active { get; set; }
            public string phoneNumber { get; set; }
            public string date { get; set; }
            public string email { get; set; }
        }
        public class GridDatTotalCount
        {
            public int TotalCount { get; set; }
        }

        public class GridDataWrapper
        {
            public List<GridData> griddata { get; set; }
            public List<GridDatTotalCount> TotalCount { get; set; }
        }
        #endregion
        #region util
        public class Util
        {
            /// <summary>
            /// Get List From DataReader
            /// </summary>
            /// <typeparam name="T"></typeparam>
            /// <param name="dr"></param>
            /// <returns></returns>
            public static List<T> DataReaderMapToList<T>(IDataReader dr)
            {
                List<T> list = new List<T>();
                T obj = default(T);
                while (dr.Read())
                {
                    obj = Activator.CreateInstance<T>();
                    foreach (PropertyInfo prop in obj.GetType().GetProperties())
                    {
                        if (!object.Equals(dr[prop.Name], DBNull.Value))
                        {
                            prop.SetValue(obj, dr[prop.Name], null);
                        }
                    }
                    list.Add(obj);
                }
                return list;
            }

            public static T ConvertTOEntity<T>(IDataReader dr)
            {
                T obj = default(T);
                while (dr.Read())
                {
                    obj = Activator.CreateInstance<T>();
                    foreach (PropertyInfo prop in obj.GetType().GetProperties())
                    {
                        if (!object.Equals(dr[prop.Name], DBNull.Value))
                            prop.SetValue(obj, dr[prop.Name], null);
                    }
                }

                return obj;
            }

        }
        #endregion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpGet]
        public ActionResult GetGridData(int _start = 0, int _limit = 0, string _sort = "Id", string _order = "ASC")
        {
            GridDataWrapper gridDataWrapper = GetGridDatadb(_start, _limit, _sort, _order, "", "");
            return Json(gridDataWrapper, JsonRequestBehavior.AllowGet);
        }
        public GridDataWrapper GetGridDatadb(int Start, int Limit, string columnName, string Searchcol, string Searchdata, string sortOrder)
        {
            try
            {
                using (SqlConnection con = new SqlConnection("Data Source=192.168.1.182;Initial Catalog=NiskooApp;Persist Security Info=True;User ID=NiskooApp;Password=kLBu5]m+z9;Connection Timeout=0"))
                {
                    GridDataWrapper gridDataWrapper = new GridDataWrapper();
                    using (SqlCommand cmd = new SqlCommand("GetGridData", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@Start", SqlDbType.VarChar, 50)).Value = Start;
                        cmd.Parameters.Add(new SqlParameter("@ColumnName", SqlDbType.VarChar, 50)).Value = columnName;
                        cmd.Parameters.Add(new SqlParameter("@SortOrder", SqlDbType.VarChar, 50)).Value = sortOrder;
                        cmd.Parameters.Add(new SqlParameter("@Limit", SqlDbType.VarChar, 50)).Value = Limit;
                        cmd.Parameters.Add(new SqlParameter("@Searchcol", SqlDbType.VarChar, 50)).Value = Searchcol;
                        cmd.Parameters.Add(new SqlParameter("@Searchdata", SqlDbType.VarChar, 50)).Value = Searchdata;
                        cmd.Connection.Open();
                        using (IDataReader dataReader = cmd.ExecuteReader())
                        {
                            gridDataWrapper.griddata = Util.DataReaderMapToList<GridData>(dataReader);
                            dataReader.NextResult();
                            gridDataWrapper.TotalCount = Util.DataReaderMapToList<GridDatTotalCount>(dataReader);
                        }
                        con.Close();
                        return gridDataWrapper;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
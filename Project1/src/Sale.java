

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class Sale
 */
@WebServlet("/Sale")
public class Sale extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Sale() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String loginUser = "root";
        String loginPasswd = "";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
        
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String cardNum = request.getParameter("cardNum");
        String cardExp = request.getParameter("cardExp");
        String userId = request.getParameter("userId");
        String saleData = request.getParameter("saleData");
        
        System.out.println(firstName);
        System.out.println(lastName);
        System.out.println(cardNum);
        System.out.println(cardExp);
        System.out.println(userId);
        System.out.println(saleData);
        
        response.setContentType("application/json"); // Response mime type
        
        PrintWriter out = response.getWriter();
        
        try {
            Class.forName("org.gjt.mm.mysql.Driver");
        		Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
        	
//        		Context initCtx = new InitialContext();
//            if (initCtx == null)
//                out.println("initCtx is NULL");
//
//            Context envCtx = (Context) initCtx.lookup("java:comp/env");
//            if (envCtx == null)
//                out.println("envCtx is NULL");
//            
//            // Look up our data source
//            DataSource ds = (DataSource) envCtx.lookup("jdbc/WriteDB");
//            System.out.print("FORTNITE");
//            System.out.println(ds);
//            
//            if (ds == null)
//                out.println("ds is null.");
//
//            Connection dbcon = ds.getConnection();
//            if (dbcon == null)
//                out.println("dbcon is null.");
            
            // Declare our statement
            Statement statement = dbcon.createStatement();
            
            // Check if email exists
            String searchQuery;
            if (cardNum.length() == 16) {
            		searchQuery = "SELECT * FROM creditcards WHERE firstName = '" + firstName + "' AND lastName = '" + lastName + 
            				"' AND expiration = '" + cardExp + "' AND id LIKE '" +  cardNum.substring(0, 4) + "%" + cardNum.substring(4,8) + "%" + 
            				cardNum.substring(8,12) + "%" + cardNum.substring(12,16) + "'";
            }
            else {
            	searchQuery = "SELECT * FROM creditcards WHERE firstName = '" + firstName + "' AND lastName = '" + lastName + 
        				"' AND expiration = '" + cardExp + "' AND id = '" + cardNum + "'";
            }
            
            System.out.println(searchQuery);
             
            
            ResultSet rs = statement.executeQuery(searchQuery);
            
            if (rs.next()) {
            		JsonObject saleInfo = new JsonObject();
            		
                String[] array = saleData.split("-", -1);
                
                System.out.println(array[0]);
                JsonParser parser = new JsonParser();
                
                String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
                System.out.println("current date");
                System.out.println(date);
                
                for (int i = 0; i < array.length; i++) {
//                	INSERT INTO sales (customerId, movieId, saleDate)
//                   VALUES ('961', 'tt0473100', '2018-02-08');
                		JsonObject m = parser.parse(array[i]).getAsJsonObject();
                		
                		String movieId = m.get("movieId").getAsString().replaceAll("\"", "");
                		System.out.println("MOVIEZZZZ");
                		System.out.println(movieId);
                		System.out.println(m.get("count"));
                		
                		String insertQuery = "INSERT INTO sales (customerId, movieId, saleDate) VALUES ('" + userId + 
                				"'," + " '" + movieId + "', " + "'" + date + "')";
                		
                		int intCount = m.get("count").getAsInt();
                		for (int x = 0; x < intCount; x++) {
                			System.out.println(insertQuery);
                			Statement insert_statement = dbcon.createStatement();
                			insert_statement.executeUpdate(insertQuery);
                		}
                }
            		
            		String m_id = rs.getString("id");
            		String m_firstName = rs.getString("firstName");
            		String m_lastName = rs.getString("lastName");
            		String m_cardExp = rs.getString("expiration");
            		System.out.println("Valid credentials!");
            		System.out.println(m_id);
            		System.out.println(m_firstName);
            		System.out.println(m_lastName);
            		System.out.println(m_cardExp);
            		
            		saleInfo.addProperty("status", "success");
//            		userInfo.addProperty("firstName", m_firstName);
//            		userInfo.addProperty("lastName", m_lastName);
            		
//            		request.getSession().setAttribute("id", m_id);
//            		request.getSession().setAttribute("firstName", m_firstName);
//            		request.getSession().setAttribute("lastName", m_lastName);
            		
            		out.write(saleInfo.toString());
            }
            
            else {
            		System.out.println("Invalid Credit Card Info");
            		JsonObject errorInfo = new JsonObject();
            		errorInfo.addProperty("error", "Invalid Credit Card Information");
            		
            		out.write(errorInfo.toString());
            }
            
            rs.close();
            statement.close();
            dbcon.close();
        } catch (SQLException ex) {
            while (ex != null) {
                System.out.println("SQL Exception:  " + ex.getMessage());
                ex = ex.getNextException();
            } // end while
        } // end catch SQLException
        catch (java.lang.Exception ex) {
            out.println("<HTML>" + "<HEAD><TITLE>" + "MovieDB: Error" + "</TITLE></HEAD>\n<BODY>"
                    + "<P>SQL error in doGet: " + ex.getMessage() + "</P></BODY></HTML>");
            return;
        }
        out.close();
        
		doGet(request, response);
	}

}

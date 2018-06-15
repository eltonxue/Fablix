

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.sql.PreparedStatement;

/**
 * Servlet implementation class SearchSingleStar
 */
@WebServlet("/SearchSingleStar")
public class SearchSingleStar extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchSingleStar() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String loginUser = "root";
        String loginPasswd = "";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
        
		response.setContentType("application/json"); // Response mime type
        
        PrintWriter out = response.getWriter();
		
		String queryString = request.getQueryString();
		
		String star = queryString.split("=")[1];
		
		star = java.net.URLDecoder.decode(star, "UTF-8");
		
		String[] starStringSplit = star.split("\\+");
		star = String.join(" ", starStringSplit);
		System.out.println(star);
		
		
		try {
            Class.forName("org.gjt.mm.mysql.Driver");
        		Class.forName("com.mysql.jdbc.Driver").newInstance();
        		
        		Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
			
//			Context initCtx = new InitialContext();
//            if (initCtx == null)
//                out.println("initCtx is NULL");
//
//            Context envCtx = (Context) initCtx.lookup("java:comp/env");
//            if (envCtx == null)
//                out.println("envCtx is NULL");
//            
//            // Look up our data source
//            DataSource ds = (DataSource) envCtx.lookup("jdbc/ReadDB");
//            
//            if (ds == null)
//                out.println("ds is null.");
//
//            Connection dbcon = ds.getConnection();
//            if (dbcon == null)
//                out.println("dbcon is null.");
        		
        		String searchQuery = "SELECT * FROM stars AS alias WHERE name LIKE ?";
        		System.out.println(searchQuery);
        		
        	    PreparedStatement pst = dbcon.prepareStatement(searchQuery);
        	    pst.setString(1, "%" + star + "%");
        	   
        	    ResultSet rs = pst.executeQuery();
        	    
        	    JsonObject starInfo = new JsonObject();
        	    
        	    while (rs.next()) {
        	    		String name = rs.getString("name");
        	    		String birthYear = rs.getString("birthYear");
        	    		starInfo.addProperty("name", name);
        	    		starInfo.addProperty("birthYear", birthYear);
        	    }
        	    
        	    out.write(starInfo.toString());
            
        	    rs.close();
        	    pst.close();
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
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}

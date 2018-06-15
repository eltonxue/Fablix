

import java.io.IOException;
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

import java.io.PrintWriter;

import com.google.gson.JsonObject;

/**
 * Servlet implementation class AddStar
 */
@WebServlet("/AddStar")
public class AddStar extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddStar() {
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
        
        String fullName = request.getParameter("fullName");
        String birthYear = request.getParameter("birthYear");
        
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
//            
//            if (ds == null)
//                out.println("ds is null.");
//
//            Connection dbcon = ds.getConnection();
//            if (dbcon == null)
//                out.println("dbcon is null.");
            
            // Declare our statement
            Statement addStatement = dbcon.createStatement();
            
            // Check if star exists
            String addStarQuery = "CALL add_star('" + fullName + "', " + birthYear + ")";
            
            ResultSet addStar_rs = addStatement.executeQuery(addStarQuery);
            
            String verifyQuery = "SELECT * FROM stars WHERE name = '" + fullName + "' AND birthYear = " + birthYear;
            
            Statement verifyStatement = dbcon.createStatement();
    
            ResultSet verify_rs = verifyStatement.executeQuery(verifyQuery);
            
            if (verify_rs.next()) {
	            	JsonObject successInfo = new JsonObject();
	        		successInfo.addProperty("message", "Successfully added '" + fullName + "' as a star!");
	        		
	        		out.write(successInfo.toString());
            }
            else {
	            	JsonObject errorInfo = new JsonObject();
	        		errorInfo.addProperty("message", "Failed to add '" + fullName + "' as a star. Please try again.");
	        		
	        		out.write(errorInfo.toString());
            		
            }
            
            addStar_rs.close();
            verify_rs.close();
            addStatement.close();
            verifyStatement.close();
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

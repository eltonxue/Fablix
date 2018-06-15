

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

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class EmployeeLogin
 */
@WebServlet("/LoginEmployee")
public class EmployeeLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EmployeeLogin() {
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
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String jsonLine = "{\"movieId\":\"tt0100275\",\"count\":1}";
        JsonParser parser = new JsonParser();
        JsonObject o = parser.parse(jsonLine).getAsJsonObject();
        
        System.out.println(o);
        System.out.println("hihihi");
        System.out.println(o.get("movieId"));
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
//            DataSource ds = (DataSource) envCtx.lookup("jdbc/ReadDB");
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
            String existsQuery = "SELECT * FROM employees WHERE email = '" + email + "' AND password = '" + password + "'";
            
            ResultSet rs = statement.executeQuery(existsQuery);
            
            if (rs.next()) {
            		JsonObject userInfo = new JsonObject();
            		
            		
            		String m_email = rs.getString("email");
            		String m_password = rs.getString("password");
            		String m_fullName = rs.getString("fullName");
            		
            		
            		userInfo.addProperty("email", m_email);
            		userInfo.addProperty("password", m_password);
            		userInfo.addProperty("fullName", m_fullName);
            		
            		request.getSession().setAttribute("email", m_email);
            		request.getSession().setAttribute("fullName", m_fullName);
            		
            		out.write(userInfo.toString());
            }
            
            else {
            		JsonObject errorInfo = new JsonObject();
            		errorInfo.addProperty("error", "Incorrect email/password");
            		
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

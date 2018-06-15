

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at URL at @ /Register, where registration happens: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String loginUser = "root";
        String loginPasswd = "cs122bfablix";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        
        try {
            //Class.forName("org.gjt.mm.mysql.Driver");
//            Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
            // Declare our statement
            Statement statement = dbcon.createStatement();
            
            // Check if email exists
            String existsQuery = "SELECT * FROM customers WHERE email = '" + email + "'";
            
            ResultSet rs = statement.executeQuery(existsQuery);
            
            
            
            
            
            // Register user to database
   
            rs.close();
            statement.close();
            dbcon.close();
        } catch (SQLException ex) {
            while (ex != null) {
                System.out.println("SQL Exception:  " + ex.getMessage());
                ex = ex.getNextException();
            } // end while
        } // end catch SQLException
        
        // Result set (look at MovieList.java)
        // JsonArray jsonArray = new JsonArray();
        // JsonObject jsonObject = new JsonObject();
        
        // jsonObject.addProperty('star_id', star_id);
        
        // out.write(jsonArray.toString());
		
		
		doGet(request, response);
	}

}

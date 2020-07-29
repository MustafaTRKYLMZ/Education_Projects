package User;



import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LoginCheck
 */
@WebServlet("/LoginCheck")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	     String username = request.getParameter("username");
	     String password = request.getParameter("password");
	     
	     User user = new User(username, password);
	     UserDatabase userdatabase = new UserDatabase();
	    
	     
	     if( userdatabase.controlUser(user)) {
	    	 response.sendRedirect("member.jsp");
	     }
	     else {
	    	 response.sendRedirect("error.jsp");
	     }
	
	}

}
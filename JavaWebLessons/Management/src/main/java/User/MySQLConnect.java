package User;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MySQLConnect implements MyProvider {

    static Connection con = null;

   // create a function to connect with mysql database


    public static Connection getConnection(){

       try {

            Class.forName("com.mysql.jdbc.Driver"); //mysql icin bu kullaniliyor

            con = DriverManager.getConnection(url, username, password);


        } catch (Exception ex) {

            System.out.println(ex.getMessage());

        }


        return con;

    }

	
}  
 

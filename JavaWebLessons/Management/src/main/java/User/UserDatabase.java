package User;
import java.sql.*;

public class UserDatabase {
    static Connection con ;

  
    
    //for register user 
    public boolean saveUser(User user){
        boolean set = false;
        try{
        	con= MySQLConnect.getConnection();
            //Insert register data to database
            String query = "insert into user values(?,?,?)";
           
           PreparedStatement pt = con.prepareStatement(query);
           pt.setString(1, user.getName());
           pt.setString(2, user.getEmail());
           pt.setString(3, user.getPassword());
           
           pt.executeUpdate();
           set = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return set;
    }
    
    public boolean controlUser(User user){
        boolean set= false ;
        try{
        	con= MySQLConnect.getConnection();
           
           Statement stmt = (Statement) con.createStatement();
           String query = "SELECT name, password FROM user;";
           System.out.println(query.toString());
           
           stmt.executeQuery(query);
           ResultSet rs = stmt.getResultSet();

           while(rs.next()){
               if(rs.getString("name").equals(user.getName()) && rs.getString("password").equals(user.getPassword())){
                   System.out.println("database dogrulandi");
                   set=true;
                }
              
        
           }
        }
           
        catch(Exception e){
            e.printStackTrace();
        }
        return set;
    }
}

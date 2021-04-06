let accountDetails ={
    1000:{acno:1000,name:"Akhil",balance:5000,password:"user1"},
    1002:{acno:1002,name:"Rajan",balance:3000,password:"user2"},
    1003:{acno:1003,name:"Amaya",balance:4000,password:"user3"},
    1004:{acno:1004,name:"Anaya",balance:3500,password:"user4"},
    1005:{acno:1005,name:"Nayana",balance:2000,password:"user5"}
  }
  let currentUser

  const register = (acno,name, password)=>{
      console.log("register called")
      
      if(acno in accountDetails){
      return{
          status:false,
          statusCode:422,
          message:"user already exist, please log in"
          
      } 
    }
    else{
      accountDetails[acno]={
        acno,
        name,
        balace:0,
        password
      }
      
      console.log(accountDetails);
      return{
        status:true,
        statusCode:200,
        message:"Registration successful"
        

      }
    }
  }
  const Login=(req,acno,password)=>{
      let dataset= accountDetails;
    if(acno in dataset){
        var password1= dataset[acno].password
      if(password1 ==password){
       req.session.currentUser = dataset[acno];
        return{
            status:true,
            statusCode:200,
            message:"login Succesful"
            
        } 
      }
      else{
        return{
            status:false,
            statusCode:422,
            message:"incorrect password"
            
        } 
      }
    }
    else{
        return{
            status:false,
            statusCode:422,
            message:"No user exist with provided Account Number"
            
        } 
    }
  }
  const Deposit = (acno,password,amount)=>{
 

    var amount = parseInt(amount);
    let dataset= accountDetails;
    if(acno in dataset){
      var password1=dataset[acno].password
      if(password1 == password){
        dataset[acno].balance+=amount
        return{
          status:true,
          statusCode:200,
          message:"Account has been credited",
          balance:dataset[acno].balance
          
                } 

        
      
      }
      else{
        return{
          status:false,
          statusCode:422,
          message:"incorrect password",
          balance:dataset[acno].balance
          
      }
      }
    }
    else{
      return{
        status:false,
        statusCode:422,
        message:"No user exist with provided Account Number",
        balance:dataset[acno].balance
        
    }

    }
  }
  const withdraw = (acno,password,amount)=>{
    var amount = parseInt(amount);
    let dataset= accountDetails;
    if(acno in dataset){
      var password1=dataset[acno].password
      if(password1 == password){
        if(dataset[acno].balance>amount){
          dataset[acno].balance-=amount
          return{
            status:true,
            statusCode:200,
            message:"Account has been debited",
            balance:dataset[acno].balance
            
                  } 

        }
        else{
          return{
            status:false,
            statusCode:422,
            message:"insufficient balance",
            balance:dataset[acno].balance
            
            } 

        }
       

        
      
      }
      else{
        return{
          status:false,
          statusCode:422,
          message:"incorrect password",
          balance:dataset[acno].balance
          
      }
      }
    }
    else{
      return{
        status:false,
        statusCode:422,
        message:"No user exist with provided Account Number",
        balance:dataset[acno].balance
        
    }

    }
  }
  module.exports = {
      register,
      Login,
      Deposit,
      withdraw
  }
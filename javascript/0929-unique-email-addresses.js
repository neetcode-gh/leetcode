var numUniqueEmails = function(emails) {
  const valid=emails.map(email=>{
       const [local, domain] = email.split('@');
       return local.split('+').shift().split('.').join('')+'@'+domain;
   });
   const set=new Set(valid)
    
    return set.size
      
    
};

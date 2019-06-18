module.exports=function(RED){
  function gaussianNode(config) {
    RED.nodes.createNode(this,config);
    var node=this;

    //Gaussian distribution
    this.mu_day=parseInt(config.mu_day);
    this.sigma_day=parseInt(config.sigma_day);
    this.mu_even=parseInt(config.mu_even);
    this.sigma_even=parseInt(config.sigma_even);
    this.mu_night=parseInt(config.mu_night);
    this.sigma_night=parseInt(config.sigma_night);

    const epsilon = 0.01;
    const tau = 2 * Math.PI;
    var z0, z1, generate;

    //Sample time
    this.tstart_day=parseInt(config.tstart_day);
    this.tend_day=parseInt(config.tend_day);
    this.tstart_even=parseInt(config.tstart_even);
    this.tend_even=parseInt(config.tend_even);
    this.tstart_night=parseInt(config.tstart_night);
    this.tend_night=parseInt(config.tend_night);

    this.on("input", function(msg) {

      var date = new Date(msg.payload);
      msg.fecha=date.toString();

      var h = date.getHours();
      var r;

      if (h >= this.tstart_day & h < this.tend_day)
        r=generateGaussianNoise(this.mu_day,this.sigma_day);
       else if (h >= this.tstart_even & h < this.tend_even) 
        r=generateGaussianNoise(this.mu_even,this.sigma_even);
       else if ((h >= this.tstart_night & h < this.tend_night) | (h==this.tend_even)) 
        r=generateGaussianNoise(this.mu_night,this.sigma_night);    

      r=parseFloat(r.toFixed(2));

      // Change the payload
      msg.payload = {"values": [{"key": "acoustic_measurement","value": r}]};

      //Add headers
      var value1='application/json';
      var value2='application/json';
      msg.headers={
        'Accept':value1,
        'Content-Type':value2
      };
      node.send(msg);
    });

    function generateGaussianNoise(mu, sigma) {

      generate = !generate;

      if (!generate) {
        return z1 * sigma + mu;
      }

      var u1, u2;
      do {
        u1 = Math.random();
        u2 = Math.random();
      } while (u1 <= epsilon);

      z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(tau * u2);
      z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(tau * u2);
      return z0 * sigma + mu;
    }

  }
  
  RED.nodes.registerType("gaussian", gaussianNode);
}

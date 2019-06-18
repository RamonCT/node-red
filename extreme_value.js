module.exports=function(RED){
    function extremeValueNode(config) {
      RED.nodes.createNode(this,config);
      var node=this;

      //CommonJS Modules
      const { Random } = require("random-js");

      //Generalized extreme value distribution
      this.mu_day=parseInt(config.mu_day);
      this.sigma_day=parseInt(config.sigma_day);
      this.k_day=parseInt(config.k_day);
      this.mu_even=parseInt(config.mu_even);
      this.sigma_even=parseInt(config.sigma_even);
      this.k_even=parseInt(config.k_even);
      this.mu_night=parseInt(config.mu_night);
      this.sigma_night=parseInt(config.sigma_night);
      this.k_night=parseInt(config.k_night);

      //Sample time
      this.tstart_day=parseInt(config.tstart_day);
      this.tend_day=parseInt(config.tend_day);
      this.tstart_even=parseInt(config.tstart_even);
      this.tend_even=parseInt(config.tend_even);
      this.tstart_night=parseInt(config.tstart_night);
      this.tend_night=parseInt(config.tend_night);

      this.on("input", function(msg) {

        const random = new Random(); //uses the nativeMath engine
        var value=0;

        const r = random.realZeroToOneExclusive();

        var date = new Date(msg.payload);
        msg.fecha= date.toString();
        var h = date.getHours();

        //Invocacion de fdpve(x, mu, sigma, k)
        if (h >= this.tstart_day & h < this.tend_day)
            value=fdpve (r, this.mu_day, this.sigma_day, this.k_day);   //Gumbel (Tipo I)
          else if (h >= this.tstart_even & h < this.tend_even) 
            value=fdpve (r, this.mu_even, this.sigma_even, this.k_even);  //Frechet (Tipo II)
          else if ((h >= this.tstart_night & h < this.tend_night) | (h==this.tend_even)) 
            value=fdpve (r, this.mu_night, this.sigma_night, this.k_night);   //Weibull (Tipo III)

        value = parseFloat(value.toFixed(2));

        // Change the payload
        msg.payload = {"values": [{"key": "acoustic_measurement","value": value}]};

        //Add headers
        var value1='application/json';
        var value2='application/json';

        msg.headers={
            'Accept':value1,
            'Content-Type':value2
        };
        node.send(msg);
      });

      function fdpve(x, mu, sigma, k){

        var a=0.0;
        var b=0.0;
        var c=0.0;

        // Tipo I
        // mu=location parameter, sigma=distribution scale (sigma>0), k=shape
        if(k === 0)
        {
            return (mu - sigma * Math.log(-Math.log(x)));
        }
        else //Tipo II (k>0) y III (k<0)
        {
            a = Math.pow(-1 * Math.log(x),-1 * k);
            b = -1 * k * mu * Math.pow(-Math.log(x),k);
            c = sigma * Math.pow(-Math.log(x),k) - sigma;
            return (-1)*(a*(b+c))/k;
        }

      }

    }

    RED.nodes.registerType("extreme_value", extremeValueNode);
  }

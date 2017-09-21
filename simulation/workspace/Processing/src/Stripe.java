import processing.core.PApplet;

 /**
 * This is just a little helper class to keep track of instances of the stripe.
 * A var +1 or -1 will determine the direction left or right across cartesian space
 * A var of magnitude will represent speed control
 * 
 * @author tekgrunt
 */
public class Stripe{
	    	
	int sWidth = 400;
	
	int x;
	int y;
	int direction;
	int velocity;
	PApplet p;
	    	
	public Stripe(int x, int y, int direction, int velocity, PApplet p){
	    		
		this.p = p;
				
		if(x > 0){
			this.x = x - sWidth;
	    } else {
	    	this.x = x;
	    }		
	    this.y = y;
	    this.direction = direction;
	    this.velocity = velocity;
	}
	    	
	public void update(){
		this.x = this.x + (direction * velocity);
		p.fill(150,0,0);
	    p.rect(x, y, sWidth, p.displayHeight/2);
	    		
	    if (x < 0 - sWidth){
	    	x = p.displayWidth;
	    }
	    		
	    if (x > p.displayWidth){
	    	x = 0 - sWidth;
	    }		
	}
	    	
	public int getX(){
		return this.x;
	}    	
	
	public int getY(){
		return this.y;
	}
}

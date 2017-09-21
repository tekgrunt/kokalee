import processing.core.PApplet;

/**
 * This is a little helper class that represent a "light drip" that comes down from the top of the screen.
 * Modeled off of the original strip class that I had created for game concept development, that idea lives on.
 *
 * @author tekgrunt
 */

public class Snow {
	
	PApplet p;
	
	int x = -1;
	int y = -1;
	
	int direction;//not being used yet but leaving here as a reminder
	int velocity;
	
	boolean isColour = false;
	
	int r = 255;
	int g = 255;
	int b = 255;
	
	public Snow(PApplet p) {
		this.p = p;
		
		//need to randomly generate a x value
		if (x < 0){
			x = (int) p.random(p.width);	
		}
		
		//need to randomly generate a velocity value (within tolerances)
		velocity = (int) p.random(6) + 4;
	}
	
	public void update() {
		
		p.fill(r, g, b);
	    p.rect(x, y, 10, 10);
		
		//seems verbose but later we may want to be able to start y at a non-0 location
		if (y < 0 ||  y > p.height) {
			y = 0;
			if (isColour) {
				r = (int) p.random(255);
				g = (int) p.random(255);
				b = (int) p.random(255);
			}
		} else {
			y = y + velocity;
		}	
	}
	
	public void flipColour() {
		
		if (isColour) {
			isColour = false;
		} else {
			isColour = true;
		}
	}
	
	public int getX() {
		return this.x;
	}
	
	public int getY() {
		return this.y;
	}
}

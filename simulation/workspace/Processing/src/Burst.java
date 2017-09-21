import processing.core.PApplet;

public class Burst {

	PApplet p;

	int x = -1;
	int y = -1;
	
	int diameter = -1;
	int velocity;
	
	int r = 255;
	int g = 255;
	int b = 255;
	
	public Burst(PApplet p) {
		
		this.p = p;
		
		x = (int) p.random(p.width);
		y = (int) p.random(p.height);
		
		diameter = 10;
		
		r = (int) p.random(255);
		g = (int) p.random(255);
		b = (int) p.random(255);
		
		velocity = (int) p.random(9) + 1;
	}
	
	public void update() {
		
		p.fill(r, g, b);
	    p.ellipse(x, y, diameter, diameter);
	    
	    diameter = diameter + velocity;
	}
}

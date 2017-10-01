import processing.core.PApplet;


public class Leaf {

	PApplet p;
	
	private int x;
	private int y;
	
	private int r;
	private int g;
	private int b;
	
	private int diameter;
	private int range;
	
	private int nodeAlpha;
	private int rangeAlpha;
	
	private int directionX;
	private int directionY;
	
	private int velocityX;
	private int velocityY;
	
	private int pathLength;
	private int pathCounter;
	
	public Leaf(PApplet p){
	
		this.p = p;
		
		x = (int) p.random(p.width);
		y = (int) p.random(p.height);
		
		r = 0;
		g = 255;
		b = 0;
		
		diameter = 10;
		range = 100;
		
		nodeAlpha = 200;
		rangeAlpha = 100;
		
		//we should randomly pick a direction by selecting + or - (velocity is going to be static)		
		//the selection of + or - should be refactored out into a little utility method
		directionX = (int) p.random(10);
		directionY = (int) p.random(10);
		
		if(directionX > 5){
			directionX = 1;
		} else {
			directionX = -1;
		}
		
		if(directionY > 5){
			directionY = 1;
		} else {
			directionY = -1;
		}

		velocityX = (int) p.random(5);
		velocityY = (int) p.random(5);
		
		//we should randomly select the length of the path the object is going to stay on
		pathLength = (int) p.random(p.height);
		pathCounter = 0;
		
		
		//when the object reaches the end of the path we reset the path counter to 0 and randomly select 
		//the given parameters again
		
		
	}
	
	public void update(){
				
		pathCounter += 1;
		
		if (pathCounter >= pathLength){
			//reset the shit
			pathCounter = 0;
			
			//again this needs to be refactored
			directionY = (int) p.random(10);
			
			if(directionX > 5){
				directionX = 1;
			} else {
				directionX = -1;
			}
			
			if(directionY > 5){
				directionY = 1;
			} else {
				directionY = -1;
			}

			velocityX = (int) p.random(5);
			velocityY = (int) p.random(5);
		}
		
		
		p.fill(r, g, b, rangeAlpha);
		p.ellipse(x, y, range, range);
		p.fill(r, g, b, nodeAlpha);
	    p.ellipse(x, y, diameter, diameter);
	}
	
	// Getters & Setters
	
	public int getX(){
		return this.x;
	}
	
	public int getY(){
		return this.y;
	}
	
	public void setX(int x){
		this.x = x;
	}
	
	public void setY(int y){
		this.y = y;
	}
	
	public int getDiameter(){
		return this.diameter;
	}
	
	public void setDiameter(int diameter){
		this.diameter = diameter;
	}
	
	public int getRange(){
		return this.range;
	}
	
	public void setRange(int range){
		this.range = range;
	}
}

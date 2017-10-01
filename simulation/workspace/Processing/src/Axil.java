import processing.core.PApplet;


public class Axil {

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
	
	public Axil(PApplet p){
	
		this.p = p;
		
		x = 0;
		y = 0;
		
		r = 0;
		g = 0;
		b = 255;
		
		diameter = 100;
		range = 1000;
		
		nodeAlpha = 200;
		rangeAlpha = 100;
	}
	
	public void update(){
				
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

import java.util.ArrayList;

import processing.core.PApplet;


public class main extends PApplet{
    
	private static final long serialVersionUID = 1L;
	
	private int width;
    private int height;
    
	private ArrayList<Axil> axilNodeArray;
	private ArrayList<Leaf> leafNodeArray;
     
    public void setup(){
    	
    	width = 2000	;
    	height = 1000;
    	
    	size(width, height);
    	frameRate(60);
    	
    	
    	//example of adding simple form axil node
    	axilNodeArray = new ArrayList<Axil>();
    	Axil axil1 = new Axil(this);
    	axil1.setX(500);
    	axil1.setY(500);
    	axilNodeArray.add(axil1);
    	
    	//example of adding simple form leaf node
    	leafNodeArray = new ArrayList<Leaf>();
    
    	createLeafNodes();
    }
    
    public void draw(){
    	//set background
    	fill(0);
    	rect(0, 0, width, height);
    	
    	axilNodes();
    	leafNodes();
    }
    
    
    //this iteration of the leaf node generator creates a random number of nodes. Future
    //versions will have a parameter outlining the number of nodes that are to be created.
    public void createLeafNodes(){
    	
    	int numNodes = (int) this.random(10);
    	
    	for (int i = 0; i < numNodes ; i++){
    		leafNodeArray.add(new Leaf(this));
    	}
    }
    
    public void axilNodes(){
    	for (int i = 0 ; i < axilNodeArray.size() ; i++){
    		axilNodeArray.get(i).update();
    	}
    }
    
    public void leafNodes(){
    	for (int i = 0 ; i < leafNodeArray.size() ; i++){
    		leafNodeArray.get(i).update();
    	}
    }
    
    public static void main(String[] args) {
    	System.out.println("Starting Processing application");
        PApplet.main("main");
    }
}
    

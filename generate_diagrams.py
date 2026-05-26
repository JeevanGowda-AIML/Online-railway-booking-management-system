import os
from PIL import Image, ImageDraw, ImageFont

def get_font(size):
    # Try different standard fonts on Windows
    fonts = [
        "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\calibri.ttf",
        "C:\\Windows\\Fonts\\arial.ttf",
        "arial.ttf"
    ]
    for font_path in fonts:
        try:
            return ImageFont.truetype(font_path, size)
        except IOError:
            continue
    return ImageFont.load_default()

def draw_centered_text(draw, text, cx, cy, font, underline=False):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx - tw / 2
    ty = cy - th / 2 - 2
    draw.text((tx, ty), text, fill="black", font=font)
    if underline:
        # Draw underline
        draw.line((tx, ty + th + 2, tx + tw, ty + th + 2), fill="black", width=2)

def draw_arrow_down(draw, x, y):
    # Arrow head pointing down
    draw.polygon([(x - 6, y - 10), (x + 6, y - 10), (x, y)], fill="black")

def get_column_x(draw, text, col_name, start_x, font):
    idx = text.find(col_name)
    if idx == -1:
        return start_x
    prefix = text[:idx]
    bbox_prefix = draw.textbbox((0, 0), prefix, font=font)
    bbox_col = draw.textbbox((0, 0), col_name, font=font)
    prefix_w = bbox_prefix[2] - bbox_prefix[0]
    col_w = bbox_col[2] - bbox_col[0]
    return start_x + prefix_w + col_w / 2

def generate_er_diagram(output_path):
    # Canvas Size
    img = Image.new("RGB", (1600, 1000), "white")
    draw = ImageDraw.Draw(img)
    
    font_title = get_font(28)
    font_entity = get_font(20)
    font_attr = get_font(15)
    font_rel = get_font(16)
    
    # Title
    draw_centered_text(draw, "Chen ER Diagram: Online Railway Booking System", 800, 50, font_title)
    
    # Coordinates of Entities (User, Booking, Train)
    user_rect = (200, 300, 380, 370)
    user_center = (290, 335)
    
    booking_rect = (710, 550, 890, 620)
    booking_center = (800, 585)
    
    train_rect = (1220, 300, 1400, 370)
    train_center = (1310, 335)
    
    # Connective lines from Entities to Attributes
    # User Attributes
    user_attrs = [
        ("id", (130, 210), True),
        ("name", (230, 170), False),
        ("email", (360, 170), False),
        ("password", (460, 220), False),
        ("role", (130, 440), False),
    ]
    for text, pos, pk in user_attrs:
        draw.line((user_center[0], user_center[1], pos[0], pos[1]), fill="black", width=2)
        # Draw attribute oval
        rx, ry = 60, 25
        draw.ellipse((pos[0]-rx, pos[1]-ry, pos[0]+rx, pos[1]+ry), outline="black", fill="white", width=2)
        draw_centered_text(draw, text, pos[0], pos[1], font_attr, underline=pk)
        
    # Train Attributes
    train_attrs = [
        ("id", (1140, 210), True),
        ("train_number", (1240, 170), False),
        ("name", (1360, 170), False),
        ("source", (1470, 210), False),
        ("destination", (1490, 280), False),
        ("departure_time", (1480, 360), False),
        ("arrival_time", (1420, 430), False),
        ("total_seats", (1300, 450), False),
        ("price_base", (1160, 430), False),
    ]
    for text, pos, pk in train_attrs:
        draw.line((train_center[0], train_center[1], pos[0], pos[1]), fill="black", width=2)
        # Draw attribute oval
        rx, ry = 65, 25
        draw.ellipse((pos[0]-rx, pos[1]-ry, pos[0]+rx, pos[1]+ry), outline="black", fill="white", width=2)
        draw_centered_text(draw, text, pos[0], pos[1], font_attr, underline=pk)

    # Booking Attributes
    booking_attrs = [
        ("id", (600, 720), True),
        ("user_id", (710, 470), False),
        ("train_id", (890, 470), False),
        ("seat_number", (720, 750), False),
        ("booking_date", (880, 750), False),
        ("status", (1000, 720), False),
    ]
    for text, pos, pk in booking_attrs:
        draw.line((booking_center[0], booking_center[1], pos[0], pos[1]), fill="black", width=2)
        # Draw attribute oval
        rx, ry = 65, 25
        draw.ellipse((pos[0]-rx, pos[1]-ry, pos[0]+rx, pos[1]+ry), outline="black", fill="white", width=2)
        draw_centered_text(draw, text, pos[0], pos[1], font_attr, underline=pk)

    # Relationships (Diamonds)
    # Makes (between User and Booking)
    makes_center = (545, 460)
    makes_poly = [
        (makes_center[0], makes_center[1] - 30),
        (makes_center[0] + 60, makes_center[1]),
        (makes_center[0], makes_center[1] + 30),
        (makes_center[0] - 60, makes_center[1])
    ]
    # Line User -> Makes -> Booking
    draw.line((user_center[0], user_center[1], makes_center[0], makes_center[1]), fill="black", width=2)
    draw.line((booking_center[0], booking_center[1], makes_center[0], makes_center[1]), fill="black", width=2)
    
    draw.polygon(makes_poly, outline="black", fill="white", width=2)
    draw_centered_text(draw, "Makes", makes_center[0], makes_center[1], font_rel)
    
    # For (between Train and Booking)
    for_center = (1055, 460)
    for_poly = [
        (for_center[0], for_center[1] - 30),
        (for_center[0] + 60, for_center[1]),
        (for_center[0], for_center[1] + 30),
        (for_center[0] - 60, for_center[1])
    ]
    # Line Train -> For -> Booking
    draw.line((train_center[0], train_center[1], for_center[0], for_center[1]), fill="black", width=2)
    draw.line((booking_center[0], booking_center[1], for_center[0], for_center[1]), fill="black", width=2)
    
    draw.polygon(for_poly, outline="black", fill="white", width=2)
    draw_centered_text(draw, "For", for_center[0], for_center[1], font_rel)

    # Draw Entity Rectangles (last so they sit on top of lines if any overlap)
    draw.rectangle(user_rect, outline="black", fill="white", width=2)
    draw_centered_text(draw, "User", user_center[0], user_center[1], font_entity)

    draw.rectangle(booking_rect, outline="black", fill="white", width=2)
    draw_centered_text(draw, "Booking", booking_center[0], booking_center[1], font_entity)

    draw.rectangle(train_rect, outline="black", fill="white", width=2)
    draw_centered_text(draw, "Train", train_center[0], train_center[1], font_entity)
    
    # Cardinality labels
    # User to Makes is '1'
    draw.text((user_center[0] + 60, user_center[1] + 15), "1", fill="black", font=font_entity)
    # Booking to Makes is 'M'
    draw.text((booking_center[0] - 120, booking_center[1] - 50), "M", fill="black", font=font_entity)
    # Train to For is '1'
    draw.text((train_center[0] - 80, train_center[1] + 15), "1", fill="black", font=font_entity)
    # Booking to For is 'M'
    draw.text((booking_center[0] + 100, booking_center[1] - 50), "M", fill="black", font=font_entity)
    
    img.save(output_path, "PNG")
    print(f"ER diagram successfully saved to {output_path}")

def generate_schema_diagram(output_path):
    # Canvas Size
    img = Image.new("RGB", (1200, 800), "white")
    draw = ImageDraw.Draw(img)
    
    font_title = get_font(28)
    font_table = get_font(18)
    
    # Title
    draw_centered_text(draw, "Relational Schema Diagram: Online Railway Booking System", 600, 50, font_title)
    
    # Colors
    box_color = (79, 157, 36) # #4F9D24 Grass Green
    text_color = "white"
    
    # Define Tables
    tables = [
        {
            "name": "users",
            "text": "users (id, name, email, password, role)",
            "box": (150, 150, 1050, 210)
        },
        {
            "name": "trains",
            "text": "trains (id, train_number, name, source, destination, departure_time, arrival_time, total_seats, price_base)",
            "box": (50, 350, 1150, 410)
        },
        {
            "name": "bookings",
            "text": "bookings (id, user_id, train_id, seat_number, booking_date, status)",
            "box": (100, 550, 1100, 610)
        }
    ]
    
    # Draw Tables
    cols_x = {}
    for tbl in tables:
        draw.rectangle(tbl["box"], fill=box_color)
        
        # Centered text in box
        box_w = tbl["box"][2] - tbl["box"][0]
        bbox_text = draw.textbbox((0, 0), tbl["text"], font=font_table)
        text_w = bbox_text[2] - bbox_text[0]
        start_x = tbl["box"][0] + (box_w - text_w) / 2
        cy = tbl["box"][1] + (tbl["box"][3] - tbl["box"][1]) / 2
        
        # Draw entire text
        draw_centered_text(draw, tbl["text"], tbl["box"][0] + box_w/2, cy, font_table)
        
        # Calculate specific column center coordinate X
        if tbl["name"] == "users":
            cols_x["users.id"] = get_column_x(draw, tbl["text"], "id", start_x, font_table)
        elif tbl["name"] == "trains":
            cols_x["trains.id"] = get_column_x(draw, tbl["text"], "id", start_x, font_table)
        elif tbl["name"] == "bookings":
            cols_x["bookings.user_id"] = get_column_x(draw, tbl["text"], "user_id", start_x, font_table)
            cols_x["bookings.train_id"] = get_column_x(draw, tbl["text"], "train_id", start_x, font_table)
            
    # Draw Foreign Key Arrows
    # 1. bookings.user_id -> users.id
    # Path: bookings.user_id (top of box, Y=550) -> up to Y=480 -> left to X=35 -> up to Y=100 -> right to users.id X -> down to users.id Y=150
    x_start1 = cols_x["bookings.user_id"]
    x_end1 = cols_x["users.id"]
    
    points1 = [
        (x_start1, 550),
        (x_start1, 480),
        (35, 480),
        (35, 100),
        (x_end1, 100),
        (x_end1, 150)
    ]
    draw.line(points1, fill="black", width=2)
    draw_arrow_down(draw, x_end1, 150)
    
    # 2. bookings.train_id -> trains.id
    # Path: bookings.train_id (top of box, Y=550) -> up to Y=460 -> left/right to trains.id X -> down to trains.id Y=410
    x_start2 = cols_x["bookings.train_id"]
    x_end2 = cols_x["trains.id"]
    
    points2 = [
        (x_start2, 550),
        (x_start2, 460),
        (x_end2, 460),
        (x_end2, 410)
    ]
    draw.line(points2, fill="black", width=2)
    draw_arrow_down(draw, x_end2, 410)
    
    img.save(output_path, "PNG")
    print(f"Schema diagram successfully saved to {output_path}")

if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)
    generate_er_diagram("assets/er_diagram.png")
    generate_schema_diagram("assets/schema_diagram.png")
    # Also save to root directory for backwards compatibility if needed
    generate_er_diagram("er_diagram.png")
    generate_schema_diagram("schema_diagram.png")

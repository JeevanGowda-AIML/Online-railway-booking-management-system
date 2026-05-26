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

def draw_arrow_left(draw, x, y):
    draw.polygon([(x + 8, y - 5), (x + 8, y + 5), (x, y)], fill="black")

def draw_arrow_right(draw, x, y):
    draw.polygon([(x - 8, y - 5), (x - 8, y + 5), (x, y)], fill="black")

def generate_schema_diagram(output_path):
    # Canvas Size
    img = Image.new("RGB", (1200, 650), "white")
    draw = ImageDraw.Draw(img)
    
    font_title = get_font(26)
    font_tbl_header = get_font(18)
    font_col = get_font(16)
    
    # Title (Sky-blue header style matches the reference image title)
    draw_centered_text(draw, "Schema Diagram for Elite Rail Database", 600, 45, font_title)
    
    # Header sky-blue color
    header_color = (203, 230, 247) # Light blue/sky blue #CBE6F7
    
    # Define Tables and Coordinates
    # users: X: 150 to 350 (width 200). Y: 100 to 140 (header), 140 to 290 (cols)
    draw.rectangle((150, 100, 350, 140), fill=header_color, outline="black", width=2)
    draw.rectangle((150, 140, 350, 295), fill="white", outline="black", width=2)
    draw_centered_text(draw, "users", 250, 120, font_tbl_header)
    
    users_cols = [("id", True), ("name", False), ("email", False), ("password", False), ("role", False)]
    for idx, (col, pk) in enumerate(users_cols):
        cy = 165 + idx * 26
        draw_centered_text(draw, col, 250, cy, font_col, underline=pk)
        
    # trains: X: 850 to 1050 (width 200). Y: 100 to 140 (header), 140 to 395 (cols)
    draw.rectangle((850, 100, 1050, 140), fill=header_color, outline="black", width=2)
    draw.rectangle((850, 140, 1050, 395), fill="white", outline="black", width=2)
    draw_centered_text(draw, "trains", 950, 120, font_tbl_header)
    
    trains_cols = [
        ("id", True), ("train_number", False), ("name", False), 
        ("source", False), ("destination", False), ("departure_time", False), 
        ("arrival_time", False), ("total_seats", False), ("price_base", False)
    ]
    for idx, (col, pk) in enumerate(trains_cols):
        cy = 165 + idx * 26
        draw_centered_text(draw, col, 950, cy, font_col, underline=pk)
        
    # bookings: X: 500 to 700 (width 200). Y: 320 to 360 (header), 360 to 540 (cols)
    draw.rectangle((500, 320, 700, 360), fill=header_color, outline="black", width=2)
    draw.rectangle((500, 360, 700, 540), fill="white", outline="black", width=2)
    draw_centered_text(draw, "bookings", 600, 340, font_tbl_header)
    
    bookings_cols = [
        ("id", True), ("user_id", False), ("train_id", False), 
        ("seat_number", False), ("booking_date", False), ("status", False)
    ]
    for idx, (col, pk) in enumerate(bookings_cols):
        cy = 385 + idx * 26
        draw_centered_text(draw, col, 600, cy, font_col, underline=pk)
        
    # Draw Referential Integrity Arrows
    # 1. bookings.user_id (FK) -> users.id (PK)
    # user_id is the 2nd column in bookings -> Y = 385 + 1 * 26 = 411. Left boundary = 500
    # users.id is the 1st column in users -> Y = 165. Right boundary = 350
    draw.line([(500, 411), (425, 411), (425, 165), (350, 165)], fill="black", width=2)
    draw_arrow_left(draw, 350, 165)
    
    # 2. bookings.train_id (FK) -> trains.id (PK)
    # train_id is the 3rd column in bookings -> Y = 385 + 2 * 26 = 437. Right boundary = 700
    # trains.id is the 1st column in trains -> Y = 165. Left boundary = 850
    draw.line([(700, 437), (775, 437), (775, 165), (850, 165)], fill="black", width=2)
    draw_arrow_right(draw, 850, 165)
    
    img.save(output_path, "PNG")
    print(f"Schema diagram successfully saved to {output_path}")

if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)
    generate_er_diagram("assets/er_diagram.png")
    generate_schema_diagram("assets/schema_diagram.png")
    # Also save to root directory for backwards compatibility if needed
    generate_er_diagram("er_diagram.png")
    generate_schema_diagram("schema_diagram.png")

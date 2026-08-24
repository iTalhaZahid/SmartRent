# SmartRent — Design Specification Document

**Product:** SmartRent: Dual-Mode Rental Management Platform
**Version:** 1.0
**Document Type:** Design Specification
**Platform:** Responsive Web Application
**Frontend:** Next.js + TypeScript + Tailwind CSS
**UI Components:** shadcn/ui
**Backend Services:** Supabase

---

# 1. Purpose

This document defines the visual and interaction design of SmartRent.

It establishes:

* Visual identity
* Color scheme
* Typography
* Layout system
* Spacing
* Component styles
* UI design patterns
* Navigation patterns
* Form patterns
* Property listing patterns
* Booking patterns
* Dashboard patterns
* Status colors
* Responsive behavior
* Accessibility requirements
* Reusable design tokens

The objective is to ensure that all SmartRent screens feel consistent and belong to the same product.

---

# 2. Design Philosophy

SmartRent should feel:

* Modern
* Trustworthy
* Clean
* Professional
* Comfortable
* Easy to understand

Because SmartRent involves homes, rentals, bookings, and personal communication, the interface should prioritize **trust and clarity** rather than looking overly playful or experimental.

The visual design should avoid:

* Excessive gradients
* Heavy shadows
* Excessive animation
* Very bright colors
* Cluttered dashboards
* Overuse of borders
* Extremely rounded components
* Too many different colors

The preferred style is:

> **Clean real-estate marketplace + modern SaaS dashboard**

---

# 3. Core Design Principles

## 3.1 Simplicity

Each page should have one obvious primary purpose.

Examples:

```text
Search Page
→ Find a Property

Property Page
→ Understand Property + Request Booking

Owner Dashboard
→ Manage Properties and Bookings

Admin Dashboard
→ Monitor and Manage Platform
```

---

## 3.2 Clear Hierarchy

Information should be visually prioritized using:

1. Page title
2. Important actions
3. Main content
4. Supporting information
5. Secondary actions

Primary actions must always be easy to identify.

---

## 3.3 Consistency

The same component should look and behave consistently throughout SmartRent.

For example, an:

```text
ACTIVE
```

status badge should use the same green style everywhere.

Similarly:

```text
PENDING
```

should use the same amber style across properties and bookings.

---

## 3.4 Trust

The application should visually communicate reliability.

This will be achieved through:

* Generous whitespace
* Strong typography
* Clear prices
* Clear booking status
* Professional imagery
* Predictable navigation
* Consistent feedback messages

---

## 3.5 Responsive Design

The interface will be designed desktop-first while remaining completely usable on:

* Desktop
* Laptop
* Tablet
* Mobile

---

# 4. Brand Direction

## Brand Name

**SmartRent**

## Brand Personality

SmartRent should visually communicate:

```text
Trust
+
Convenience
+
Property
+
Technology
+
Simplicity
```

The visual identity should not feel like a banking application or a corporate enterprise dashboard.

It should retain warmth suitable for discovering homes and rental properties.

---

# 5. Primary Color Scheme

The recommended SmartRent palette combines **deep navy** with **emerald/teal**.

Navy communicates trust and professionalism.

Emerald communicates positive actions, availability, property, and growth.

---

## Primary Brand Color

### SmartRent Emerald

```text
#0F766E
```

Use for:

* Primary buttons
* Active navigation
* Selected controls
* Important links
* Brand highlights
* Calendar selection
* Focus indicators

Tailwind equivalent:

```text
teal-700
```

---

## Primary Hover

```text
#115E59
```

Use when hovering over primary interactive elements.

Tailwind:

```text
teal-800
```

---

## Primary Light

```text
#CCFBF1
```

Use for:

* Selected backgrounds
* Soft badges
* Active navigation background
* Highlighted sections

Tailwind:

```text
teal-100
```

---

# 6. Dark Brand Color

### SmartRent Navy

```text
#0F172A
```

Use for:

* Main headings
* Navigation text
* Logo text
* Important labels
* Footer

Tailwind:

```text
slate-900
```

This should be preferred over pure black.

---

# 7. Neutral Colors

## Main Background

```text
#F8FAFC
```

Tailwind:

```text
slate-50
```

Use as the primary application background.

---

## Card Background

```text
#FFFFFF
```

Used for:

* Property cards
* Dashboard cards
* Forms
* Modals
* Dropdowns

---

## Secondary Background

```text
#F1F5F9
```

Tailwind:

```text
slate-100
```

Used for:

* Secondary panels
* Table headers
* Filter backgrounds
* Disabled sections

---

## Primary Text

```text
#0F172A
```

Tailwind:

```text
slate-900
```

---

## Secondary Text

```text
#475569
```

Tailwind:

```text
slate-600
```

---

## Muted Text

```text
#64748B
```

Tailwind:

```text
slate-500
```

---

## Border

```text
#E2E8F0
```

Tailwind:

```text
slate-200
```

---

# 8. Functional Colors

Functional colors should communicate meaning consistently.

---

## Success

```text
#16A34A
```

Tailwind:

```text
green-600
```

Used for:

* Successful actions
* Approved bookings
* Active properties
* Available states
* Completed operations

Soft background:

```text
#DCFCE7
```

---

## Warning

```text
#D97706
```

Tailwind:

```text
amber-600
```

Used for:

* Pending bookings
* Pending properties
* Warnings
* Lease expiry

Soft background:

```text
#FEF3C7
```

---

## Error / Destructive

```text
#DC2626
```

Tailwind:

```text
red-600
```

Used for:

* Rejected booking
* Delete
* Suspend user
* Validation errors
* Destructive actions

Soft background:

```text
#FEE2E2
```

---

## Informational

```text
#2563EB
```

Tailwind:

```text
blue-600
```

Used for:

* Informational alerts
* Optional links
* System messages

Soft background:

```text
#DBEAFE
```

---

# 9. Status Color System

Status colors must be standardized.

| Status    | Color     |
| --------- | --------- |
| AVAILABLE | Green     |
| RESERVED  | Amber     |
| BOOKED    | Teal      |
| BLOCKED   | Gray      |
| PENDING   | Amber     |
| APPROVED  | Green     |
| ACTIVE    | Green     |
| COMPLETED | Blue/Gray |
| CANCELLED | Gray      |
| REJECTED  | Red       |
| SUSPENDED | Red       |
| EXPIRED   | Gray      |

Example:

```text
PENDING

Text:       #B45309
Background: #FEF3C7
```

```text
APPROVED

Text:       #15803D
Background: #DCFCE7
```

```text
REJECTED

Text:       #B91C1C
Background: #FEE2E2
```

---

# 10. Color Usage Rule

Use approximately:

```text
70% Neutral Colors
20% Brand Colors
10% Functional / Accent Colors
```

The interface should therefore remain mostly white and neutral.

Emerald should highlight important actions rather than covering entire pages.

---

# 11. Typography

Recommended font:

**Inter**

Fallback:

```css
font-family:
Inter,
ui-sans-serif,
system-ui,
sans-serif;
```

Inter works well for dashboards, forms, property cards, numbers, and responsive interfaces.

---

# 12. Typography Scale

## Display Heading

```text
48px
Font Weight: 700
Line Height: 1.1
```

Used primarily on marketing/home page hero sections.

---

## H1

```text
32px
Font Weight: 700
```

Example:

**Owner Dashboard**

---

## H2

```text
24px
Font Weight: 600
```

Example:

**Recent Booking Requests**

---

## H3

```text
20px
Font Weight: 600
```

Example:

**Maple Grove Apartments**

---

## Body

```text
16px
Font Weight: 400
```

---

## Small

```text
14px
```

Used for:

* Metadata
* Secondary information
* Dates
* Locations

---

## Caption

```text
12px
```

Use sparingly.

---

# 13. Font Weight

Use mainly:

```text
400 Regular
500 Medium
600 Semibold
700 Bold
```

Avoid extremely heavy typography.

---

# 14. Spacing System

Use Tailwind's standard spacing system.

Primary spacing increments:

```text
4px
8px
12px
16px
24px
32px
48px
64px
```

Most component spacing should use:

```text
8px
16px
24px
```

---

# 15. Border Radius

SmartRent should use moderately rounded components.

## Inputs

```text
8px
```

## Buttons

```text
8px
```

## Cards

```text
12px
```

## Large Containers

```text
16px
```

Avoid excessive pill-shaped UI except for:

* Tags
* Status badges
* Small filters

---

# 16. Shadows

Use shadows sparingly.

Recommended card shadow:

```text
shadow-sm
```

Hover:

```text
shadow-md
```

Major cards should primarily use borders rather than heavy shadows.

Example:

```text
border border-slate-200
shadow-sm
```

---

# 17. Button Design Pattern

SmartRent uses four primary button types.

---

## Primary Button

Used for the most important action.

Examples:

```text
Search
Send Booking Request
Add Property
Save Changes
Approve Booking
```

Style:

```text
Background: #0F766E
Text: White
Radius: 8px
Height: 40–44px
```

---

## Secondary Button

Examples:

```text
Contact Owner
View Details
Cancel
```

Style:

```text
White Background
Slate Border
Dark Text
```

---

## Ghost Button

Examples:

```text
Reset Filters
View All
Back
```

No prominent background.

---

## Destructive Button

Examples:

```text
Reject
Delete
Suspend
```

Style:

```text
Red background or red text
```

Destructive actions must not use the main SmartRent emerald.

---

# 18. Form Design Pattern

Forms should follow a vertical layout.

Example:

```text
Email Address
┌──────────────────────────────┐
│ you@example.com              │
└──────────────────────────────┘

Password
┌──────────────────────────────┐
│ •••••••••••••                │
└──────────────────────────────┘

[ Login ]
```

Every input should include:

* Label
* Input
* Optional helper text
* Error message when required

Placeholders must not replace labels.

---

# 19. Input States

## Default

```text
Border: slate-300
```

## Focus

```text
Border: teal-700
Focus Ring: teal-200
```

## Error

```text
Border: red-500
Error Text: red-600
```

## Disabled

```text
Background: slate-100
Text: slate-500
```

---

# 20. Authentication Screen Pattern

Login and registration screens should follow the visual direction shown in the original SmartRent wireframes.

Desktop layout:

```text
┌────────────────────────────────────────────┐
│ SmartRent                       Help       │
├────────────────────┬───────────────────────┤
│                    │                       │
│ Property           │   Welcome Back        │
│ Illustration       │                       │
│                    │   Email               │
│ Find your          │   Password            │
│ perfect rental     │                       │
│                    │   [ Login ]            │
│                    │                       │
└────────────────────┴───────────────────────┘
```

On mobile:

```text
SmartRent

Welcome Back

Email
Password

[ Login ]

Create Account
```

The decorative illustration can disappear on small devices.

---

# 21. Navigation Pattern

SmartRent should use role-specific navigation.

---

# 22. Renter Navigation

Desktop:

```text
SmartRent

Home
Browse Properties
My Bookings
Messages
Notifications
Profile
```

Primary action:

```text
Browse Properties
```

---

# 23. Owner Navigation

```text
SmartRent

Dashboard
My Properties
Bookings
Messages
Analytics
Profile
```

---

# 24. Admin Navigation

```text
SmartRent

Dashboard
Users
Properties
Bookings
Reports
Settings
Profile
```

---

# 25. Mobile Navigation

Use:

* Responsive hamburger navigation

or, for authenticated frequently used screens:

* Compact bottom navigation

Do not attempt to place the complete desktop navigation horizontally on a small screen.

---

# 26. Property Search Design Pattern

Property search should follow:

```text
Search + Core Filters
        ↓
Filter Sidebar + Property Results
```

Desktop:

```text
┌─────────────────────────────────────────────┐
│ Location │ Check-in │ Check-out │ Search   │
├───────────┬─────────────────────────────────┤
│ FILTERS   │ Find Your Perfect Property      │
│           │                                 │
│ Location  │ [Property] [Property] [Property]│
│ Mode      │                                 │
│ Price     │ [Property] [Property] [Property]│
│ Bedrooms  │                                 │
│ Amenities │                                 │
└───────────┴─────────────────────────────────┘
```

This preserves the search structure established by the existing SmartRent wireframe.

---

# 27. Mobile Property Search Pattern

Filters should not permanently consume horizontal space.

Use:

```text
Search Bar

[Filters] [Sort]

Property Card

Property Card

Property Card
```

Selecting Filters opens a drawer or sheet.

---

# 28. Property Card Pattern

Each property card should contain:

```text
┌────────────────────────────┐
│                            │
│       Property Image       │
│                      ♡     │
├────────────────────────────┤
│ LONG-TERM                  │
│ Maple Grove Apartments     │
│ Austin, TX                 │
│                            │
│ 2 Beds · 2 Baths           │
│                            │
│ $1,850 / month             │
│                            │
│ [ View Details ]           │
└────────────────────────────┘
```

Information priority:

1. Property image
2. Property title
3. Location
4. Main characteristics
5. Price
6. Action

---

# 29. Property Image Pattern

Recommended card image ratio:

```text
4:3
```

Property gallery:

```text
16:9
```

Images must use:

```text
object-cover
```

to prevent distorted property photographs.

---

# 30. Property Details Pattern

Desktop:

```text
┌────────────────────────────────────────────────────┐
│                 IMAGE GALLERY                      │
├───────────────────────────────┬────────────────────┤
│ Property Details              │ Booking Card       │
│                               │                    │
│ Title                         │ Rental Mode        │
│ Location                      │ Start Date         │
│ Price                         │ End Date           │
│ Amenities                     │ Occupants          │
│ Description                   │                    │
│ Availability                  │ Price Summary      │
│ Location                      │                    │
│ Owner                         │ [Request Booking]  │
└───────────────────────────────┴────────────────────┘
```

The booking card should remain visible while the renter explores the property on desktop.

---

# 31. Sticky Booking Panel Pattern

On larger screens:

```text
position: sticky
top: appropriate-header-offset
```

This keeps the booking action accessible.

On mobile, the booking form becomes part of the normal vertical flow.

---

# 32. Availability Calendar Pattern

Availability must communicate state without relying only on color.

Example:

```text
Available   ✓
Reserved    ◐
Booked      ●
Blocked     —
```

Color may support the meaning but should not be the only indicator.

---

# 33. Booking Flow Pattern

Booking should use progressive disclosure.

Do not display unnecessary information before the user needs it.

Recommended sequence:

```text
Select Rental Mode
        ↓
Select Dates
        ↓
Number of Occupants
        ↓
Price Summary
        ↓
Submit Request
```

---

# 34. Price Summary Pattern

Booking cards should clearly separate calculations.

Example:

```text
Price Summary

Monthly Rent          $1,850
Duration              3 months
────────────────────────────
Estimated Total       $5,550
```

The total should have the strongest visual emphasis.

---

# 35. Booking Status Pattern

Booking lists should use:

```text
Property
Dates
Rental Mode
Status
Action
```

Example:

```text
Maple Grove Apartments

Jun 16 – Jul 16
Long-Term

[PENDING]

View Details
```

---

# 36. Dashboard Design Pattern

Dashboards should follow:

```text
Page Header
    ↓
Metrics
    ↓
Primary Operational Information
    ↓
Secondary Analytics
```

Do not immediately fill the screen with graphs.

The user should first see information requiring action.

---

# 37. Dashboard Metric Card Pattern

Example:

```text
┌─────────────────────┐
│ Total Properties    │
│                     │
│        24           │
│                     │
│ +2 this month       │
└─────────────────────┘
```

Each metric card should contain:

* Label
* Main value
* Optional trend
* Simple icon

Avoid large decorative illustrations.

---

# 38. Owner Dashboard Layout

Recommended hierarchy:

```text
Owner Dashboard

[Properties] [Bookings] [Revenue] [Pending Requests]

My Properties        Recent Booking Requests

Calendar             Messages

Revenue              Occupancy
```

Pending booking requests should be positioned prominently because they require owner action.

---

# 39. Admin Dashboard Layout

Recommended hierarchy:

```text
Admin Dashboard

[Users] [Properties] [Bookings] [Pending] [Reports]

User Management

Property Moderation

Platform Analytics

Recent Activity
```

Administration screens should be more data-dense than renter interfaces but must remain readable.

---

# 40. Table Pattern

Use tables primarily for:

* Admin users
* Property moderation
* Owner booking requests
* Reports

Example:

```text
Property          Owner        Status       Action
----------------------------------------------------
Maple Grove       John         Pending      Review
Parkside Condo    Sarah        Active       View
```

On mobile, convert dense table rows into stacked cards where necessary.

---

# 41. Status Badge Pattern

Status badges should use:

```text
rounded-full
px-2.5
py-1
text-xs
font-medium
```

Example:

```text
[ ACTIVE ]

[ PENDING ]

[ REJECTED ]
```

Badges communicate state, not actions.

---

# 42. Modal Pattern

Use modals only for short decisions.

Good examples:

```text
Reject Booking
Delete Property
Suspend User
Confirm Logout
```

Do not place large forms inside small modals.

---

# 43. Confirmation Pattern

Destructive action confirmation:

```text
Reject Booking?

This booking request will be rejected and
the reserved dates will become available.

[Cancel] [Reject Booking]
```

The destructive action should visually differ from the safe action.

---

# 44. Drawer / Sheet Pattern

Use side sheets for:

* Mobile filters
* Mobile navigation
* Notification details
* Lightweight editing

This avoids navigating users away unnecessarily.

---

# 45. Empty State Pattern

Empty states should explain what happened and suggest the next action.

Bad:

```text
No Data
```

Good:

```text
No properties yet

Add your first property to start receiving
booking requests.

[ Add Property ]
```

---

# 46. Loading Pattern

Use skeletons for content-heavy pages.

Example:

```text
Property Card Skeleton

████████████████
████████
██████
██████████
```

Use button spinners for operations such as:

```text
Submitting...
Saving...
Approving...
```

---

# 47. Error Pattern

Errors should be specific.

Bad:

```text
Something went wrong.
```

Better:

```text
These dates are no longer available.
Please select another period.
```

For form errors, position the message close to the problematic field.

---

# 48. Toast Pattern

Use temporary toast notifications for simple action feedback.

Examples:

```text
Property created successfully.

Booking request submitted.

Availability updated.
```

Do not use toast notifications for information the user must read carefully.

---

# 49. Notification Center Pattern

Notifications should display:

```text
Icon

Booking Approved

Your booking for Maple Grove Apartments
has been approved.

5 minutes ago
```

Unread notifications can use a subtle brand-tinted background.

---

# 50. Card Pattern

Standard card:

```text
Background: White
Border: slate-200
Radius: 12px
Shadow: Small
Padding: 16–24px
```

Avoid nesting multiple cards inside cards unless necessary.

---

# 51. Iconography

Recommended:

**Lucide Icons**

Use simple outline icons.

Examples:

```text
Home
Building
Calendar
MessageCircle
Bell
User
Search
MapPin
Bed
Bath
Heart
Settings
```

Use consistent icon sizes:

```text
16px
20px
24px
```

---

# 52. Image Style

Property imagery should:

* Be large enough to evaluate the property
* Maintain consistent aspect ratios
* Avoid excessive overlays
* Use subtle rounded corners
* Preserve natural colors

Dark text overlays should be avoided unless a dark image overlay guarantees readability.

---

# 53. Design Patterns Used

SmartRent will use the following common interface patterns.

---

## 53.1 Card-Based Design

Used for:

* Properties
* Dashboard metrics
* Booking summaries
* Notifications

Reason:

Cards make information easy to scan and adapt well between desktop and mobile.

---

## 53.2 Master-Detail Pattern

Used for:

```text
Property List → Property Details

Booking List → Booking Details

User List → User Details
```

This provides predictable navigation.

---

## 53.3 Filter + Results Pattern

Used on property search.

```text
Search
+
Filters
+
Results
```

This allows renters to progressively narrow available listings.

---

## 53.4 Dashboard Pattern

Used for Owner and Admin.

```text
Summary
+
Operational Data
+
Analytics
```

---

## 53.5 Status-Driven Workflow Pattern

Used heavily throughout SmartRent.

Example:

```text
PENDING
   ↓
APPROVED
   ↓
ACTIVE
   ↓
COMPLETED
```

UI colors, badges, and available actions should change according to status.

---

## 53.6 Role-Based Interface Pattern

The same application presents different interfaces according to user role.

```text
RENTER
OWNER
ADMIN
```

Navigation and actions should be determined by role.

---

## 53.7 Progressive Disclosure Pattern

Show advanced information only when required.

Examples:

* Advanced filters
* Rejection reason
* Lease information
* Property management options

---

## 53.8 Confirmation Pattern

Actions with significant consequences require confirmation.

Examples:

* Reject booking
* Cancel booking
* Disable property
* Suspend user

---

## 53.9 Feedback Pattern

Every user action should generate immediate feedback.

```text
Action
   ↓
Loading
   ↓
Success / Error
```

---

# 54. Application Design Pattern

At the codebase level, SmartRent should follow a **component-driven design**.

The interface should be composed from reusable components.

Example:

```text
components/

Button
Input
Select
Badge
Card
Dialog
PropertyCard
BookingCard
StatusBadge
MetricCard
Calendar
DataTable
```

This prevents duplicated UI code.

---

# 55. Feature Organization Pattern

Application features should be organized by domain.

Example:

```text
properties
bookings
availability
leases
messages
notifications
admin
```

Business logic should not be duplicated across page components.

---

# 56. Server/Client Separation Pattern

Next.js Server Components should be preferred for pages that primarily retrieve and display data.

Client Components should be used when browser interaction is required.

Examples of Client Components:

* Calendar interaction
* Search filters
* Forms
* Modal dialogs
* Image gallery controls

Do not mark entire pages as client components unnecessarily.

---

# 57. Authorization Pattern

Authorization should combine:

```text
Supabase Auth
+
User Role
+
Row Level Security
```

Authentication answers:

> Who is the user?

Role authorization answers:

> What type of user are they?

RLS answers:

> Which records are they allowed to access?

---

# 58. Responsive Breakpoints

Use Tailwind standard breakpoints.

```text
sm   640px
md   768px
lg   1024px
xl   1280px
2xl  1536px
```

---

# 59. Responsive Property Grid

Recommended:

```text
Mobile
1 column

Tablet
2 columns

Desktop
3 columns

Large Desktop
3–4 columns depending on sidebar
```

---

# 60. Container Width

Primary content:

```text
max-width: 1280px
```

Marketing pages may use:

```text
max-width: 1440px
```

Content should remain centered.

---

# 61. Responsive Dashboard Pattern

Desktop:

```text
Sidebar / Header
+
Multi-column dashboard
```

Mobile:

```text
Header
↓
Metric Cards
↓
Pending Actions
↓
Properties
↓
Calendar
↓
Analytics
```

Important content should be reordered rather than merely shrunk.

---

# 62. Accessibility

SmartRent should aim to meet **WCAG 2.1 AA** accessibility principles.

Requirements include:

* Sufficient text contrast
* Visible focus states
* Keyboard navigation
* Accessible labels
* Semantic HTML
* Proper heading hierarchy
* Alternative image text
* Form error association
* Buttons instead of clickable divs

---

# 63. Color Accessibility

Color must not be the only method of communicating state.

For example:

Do not show:

```text
●
```

with only green/red distinction.

Show:

```text
✓ Available

× Unavailable
```

with corresponding color.

---

# 64. Focus State

Interactive controls should display a visible focus ring.

Example:

```text
focus:ring-2
focus:ring-teal-500
focus:ring-offset-2
```

---

# 65. Animation

Animations should be subtle.

Recommended durations:

```text
150ms
200ms
300ms
```

Use transitions for:

* Button hover
* Dropdowns
* Modals
* Drawers
* Cards
* Tabs

Avoid excessive scroll animations.

---

# 66. Logo Direction

The SmartRent logo should be:

* Simple
* Flat
* Modern
* Easily readable
* Suitable for web navigation

Possible symbol concepts:

```text
Home + Check Mark

Home + Key

Building + S

Location Pin + Home
```

Preferred approach:

**Simple geometric home/property icon + SmartRent wordmark**

Use:

```text
SmartRent
```

with:

```text
Smart
```

in navy and:

```text
Rent
```

in SmartRent Emerald.

---

# 67. Design Tokens

Recommended global tokens:

```text
Primary
#0F766E

Primary Hover
#115E59

Primary Light
#CCFBF1

Foreground
#0F172A

Secondary Foreground
#475569

Muted
#64748B

Background
#F8FAFC

Card
#FFFFFF

Border
#E2E8F0

Success
#16A34A

Warning
#D97706

Error
#DC2626

Info
#2563EB
```

---

# 68. Suggested Tailwind Variables

```css
:root {
  --background: #F8FAFC;
  --foreground: #0F172A;

  --card: #FFFFFF;

  --primary: #0F766E;
  --primary-hover: #115E59;
  --primary-light: #CCFBF1;

  --secondary: #F1F5F9;

  --muted: #64748B;

  --border: #E2E8F0;

  --success: #16A34A;
  --warning: #D97706;
  --destructive: #DC2626;
  --info: #2563EB;
}
```

---

# 69. Main Screen Visual Direction

## Login

```text
Minimal
Two-column desktop
Centered mobile form
White cards
Navy headings
Emerald primary CTA
```

---

## Registration

```text
Same structure as Login
Clear role selector
Minimal fields
Strong Create Account CTA
```

---

## Property Search

```text
Bright background
Large search bar
White filter sidebar
Image-focused property cards
Minimal borders
```

---

## Property Details

```text
Large property photography
Clean content hierarchy
Sticky booking card
Simple availability calendar
Clear price summary
```

---

## Owner Dashboard

```text
Professional SaaS dashboard
Metric cards
Booking requests emphasized
Simple charts
Compact calendar
```

---

## Admin Dashboard

```text
More data dense
Tables
Moderation queues
Status badges
Platform metrics
Less imagery
```

---

# 70. Component Priority

The following components should be designed first:

1. Button
2. Input
3. Select
4. Card
5. Status Badge
6. Dialog
7. Property Card
8. Search Bar
9. Filter Panel
10. Calendar
11. Booking Card
12. Metric Card
13. Data Table
14. Notification Item
15. Dashboard Navigation

Once these components are consistent, most SmartRent screens can be assembled from them.

---

# 71. Design Consistency Rules

Developers should avoid manually styling identical elements differently across pages.

For example, do not create:

```text
PropertyStatusBadge
BookingStatusBadge
LeaseStatusBadge
```

with completely separate visual logic.

Create a reusable:

```text
StatusBadge
```

and provide status variants.

Likewise use shared:

```text
Button
Input
Select
Card
Dialog
```

components.

---

# 72. Design Handoff Rule

Before implementing a screen, verify:

* Correct page hierarchy
* Correct navigation
* Correct button variant
* Correct status colors
* Correct spacing
* Correct typography
* Mobile behavior
* Loading state
* Empty state
* Error state
* Accessibility

---

# 73. Final Visual System

SmartRent should visually follow:

```text
                 SMARTRENT
                     │
          ┌──────────┴─────────┐
          │                    │
       NAVY                 EMERALD
       Trust                 Action
       Text                  Brand
       Structure             Selection
          │                    │
          └──────────┬─────────┘
                     │
               WHITE / SLATE
                     │
             Clean Interface
                     │
       ┌─────────────┼─────────────┐
       │             │             │
    Property      Booking       Dashboard
     Cards         Flow          Cards
```

---

# 74. Final Color Palette

| Purpose           | Color             | Hex       |
| ----------------- | ----------------- | --------- |
| Primary Brand     | SmartRent Emerald | `#0F766E` |
| Primary Hover     | Dark Emerald      | `#115E59` |
| Primary Light     | Light Teal        | `#CCFBF1` |
| Main Text         | Deep Navy         | `#0F172A` |
| Secondary Text    | Slate             | `#475569` |
| Muted Text        | Muted Slate       | `#64748B` |
| App Background    | Off White         | `#F8FAFC` |
| Card              | White             | `#FFFFFF` |
| Secondary Surface | Light Slate       | `#F1F5F9` |
| Border            | Slate Border      | `#E2E8F0` |
| Success           | Green             | `#16A34A` |
| Warning           | Amber             | `#D97706` |
| Error             | Red               | `#DC2626` |
| Information       | Blue              | `#2563EB` |

---

# 75. Design Summary

SmartRent Version 1.0 should use a **clean, professional real-estate marketplace design combined with a lightweight SaaS dashboard system**.

The renter-facing experience should be visual and property-focused.

The owner experience should prioritize bookings, properties, and availability.

The administrator experience should prioritize data management and moderation.

The core visual identity will use:

**Deep Navy + SmartRent Emerald + White + Slate**

The core UI patterns will be:

**Cards + Clear Forms + Status Badges + Filtered Search + Master-Detail Navigation + Role-Based Dashboards + Progressive Booking Flow.**

The final result should feel modern enough for a commercial rental product while remaining straightforward to implement with **Next.js, Tailwind CSS, shadcn/ui, and Supabase**.

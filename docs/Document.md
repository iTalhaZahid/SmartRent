# SmartRent — Product Requirements Document

**Product Name:** SmartRent
**Product Type:** Dual-Mode Rental Management Platform
**Version:** 1.0
**Platform:** Web Application
**Primary Users:** Renters, Property Owners, Administrators

---

# 1. Product Overview

SmartRent is a web-based rental management platform that connects **Property Owners** with **Renters**.

The platform supports two types of rentals:

* Short-Term Rentals
* Long-Term Rentals

Renters can discover properties, check availability, submit booking requests, communicate with owners, and manage their rental history.

Property Owners can create property listings, manage availability, approve or reject booking requests, manage active rentals and leases, communicate with renters, and view property analytics.

Administrators manage users, moderate properties, monitor platform activity, and access overall system analytics.

Online payment processing is **not included in Version 1.0**.

---

# 2. Product Objective

The objective of SmartRent is to provide a simple and centralized platform where property rental activities can be managed digitally.

The system should reduce manual communication and make the complete rental process easier to manage:

```text
Property Discovery
        ↓
Property Details
        ↓
Availability Check
        ↓
Booking Request
        ↓
Owner Approval
        ↓
Rental / Lease
        ↓
Completion
```

---

# 3. Product Goals

SmartRent should:

* Allow users to securely create accounts and log in.
* Allow property owners to publish rental properties.
* Allow renters to easily search and filter available properties.
* Support both short-term and long-term rental models.
* Maintain property availability.
* Prevent conflicting bookings.
* Allow renters to submit booking requests.
* Allow owners to approve or reject requests.
* Track active rentals and leases.
* Allow renters and owners to communicate.
* Provide notifications for important events.
* Provide property performance analytics for owners.
* Provide administration features for platform management.
* Maintain rental and booking history.

---

# 4. Technology Stack

SmartRent will use a simple full-stack architecture.

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

## Backend

Backend functionality will be implemented within Next.js using:

* Server Actions
* Route Handlers
* Server-side functions

A separate Express, Django, or NestJS backend is not required for Version 1.0.

## Backend Services

SmartRent will use **Supabase** for:

* PostgreSQL Database
* Authentication
* File/Image Storage
* Row Level Security
* Optional Realtime features

## Additional Libraries

* Zod — validation
* React Hook Form — forms
* Recharts — analytics charts

## Deployment

* Next.js → Vercel
* Database/Auth/Storage → Supabase

---

# 5. High-Level Architecture

```text
                    USER
                     │
                     ▼
              ┌─────────────┐
              │   Next.js   │
              │ TypeScript  │
              │  Tailwind   │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │  SUPABASE   │
              ├─────────────┤
              │ PostgreSQL  │
              │ Auth        │
              │ Storage     │
              │ RLS         │
              │ Realtime    │
              └─────────────┘
```

The architecture should remain simple so development effort is focused on SmartRent's core rental features rather than infrastructure.

---

# 6. User Roles

SmartRent has three primary roles.

```text
RENTER
OWNER
ADMIN
```

---

# 7. Renter

A Renter can:

* Register
* Login
* Logout
* Manage profile
* Search properties
* Apply filters
* View property details
* View property images
* View amenities
* View property availability
* Select rental mode
* Submit booking requests
* View booking status
* Cancel eligible bookings
* View active rentals
* View rental history
* Message property owners
* Receive notifications

---

# 8. Property Owner

A Property Owner can:

* Register
* Login
* Logout
* Manage profile
* Add properties
* Edit properties
* Upload property images
* Configure rental modes
* Set rental prices
* Configure amenities
* Manage property availability
* Block dates
* Unblock dates
* Receive booking requests
* Approve booking requests
* Reject booking requests
* Manage active rentals
* Manage long-term leases
* Communicate with renters
* Receive notifications
* View analytics

---

# 9. Administrator

An Administrator can:

* Login
* View users
* Search users
* Suspend users
* Reactivate users
* View properties
* Moderate properties
* Approve properties
* Reject properties
* Disable inappropriate properties
* View bookings
* View platform analytics
* Review reports
* Monitor platform activity

Admin accounts will not be created through normal public registration.

---

# 10. Authentication

Authentication will be handled by **Supabase Auth**.

The application will not implement its own authentication system.

Supabase will handle:

* User registration
* Email/password login
* Logout
* Sessions
* Authentication tokens
* Password reset
* Email verification

---

# 11. User Profile

Supabase manages authentication users.

SmartRent will maintain its own user profile information.

Recommended profile information:

```text
id
full_name
phone
role
avatar_url
status
created_at
updated_at
```

The profile ID should be linked to the authenticated Supabase user.

---

# 12. User Roles

Application roles:

```text
RENTER
OWNER
ADMIN
```

Role-based permissions will determine which pages and actions users can access.

For example:

```text
RENTER
   ↓
Can create bookings
Cannot create properties

OWNER
   ↓
Can create properties
Can manage bookings for own properties

ADMIN
   ↓
Can manage users and properties
```

---

# 13. Property Management

Property Owners can create property listings.

A property should contain:

```text
id
owner_id
title
description
address
city
property_type
bedrooms
bathrooms
max_occupants
short_term_price
monthly_price
rental_mode
status
created_at
updated_at
```

---

# 14. Property Rental Modes

A property can support:

```text
SHORT_TERM
LONG_TERM
BOTH
```

### SHORT_TERM

Rental based on selected days/nights.

### LONG_TERM

Rental based on a longer lease period.

### BOTH

Property supports both rental models.

---

# 15. Property Status

Recommended statuses:

```text
PENDING
ACTIVE
REJECTED
INACTIVE
```

New properties may require admin approval before appearing publicly.

Only:

```text
ACTIVE
```

properties should appear in normal renter searches.

---

# 16. Property Images

Property Owners can upload multiple property images.

Images will be stored in **Supabase Storage**.

Example bucket:

```text
property-images
```

Suggested structure:

```text
property-images/
    property-id/
        image-1.jpg
        image-2.jpg
        image-3.jpg
```

The database will store image metadata.

```text
id
property_id
storage_path
is_cover
created_at
```

---

# 17. Amenities

Properties can have multiple amenities.

Examples:

* Wi-Fi
* Parking
* Air Conditioning
* Heating
* Kitchen
* Furnished
* Gym
* Pool
* Pet Friendly
* Security

Amenities should be reusable so multiple properties can reference the same amenity.

---

# 18. Property Search

Renters can browse properties available on SmartRent.

Search should support:

* City
* Area/location
* Property name
* Address keyword

---

# 19. Property Filters

Renters can filter properties using:

* Rental Mode
* Property Type
* Minimum Price
* Maximum Price
* Bedrooms
* Bathrooms
* Amenities
* Availability Dates

---

# 20. Property Sorting

Users may sort search results by:

* Recommended
* Price: Low to High
* Price: High to Low
* Newest

---

# 21. Property Search Result Card

Each property card should display:

* Cover image
* Property title
* Location
* Rental mode
* Number of bedrooms
* Number of bathrooms
* Price
* View Details button

---

# 22. Property Details Page

A property details page should display:

* Image gallery
* Property name
* Description
* Address/location
* Property type
* Bedrooms
* Bathrooms
* Amenities
* Rental modes
* Rental pricing
* Availability calendar
* Property Owner information
* Booking form
* Contact Owner option

---

# 23. Availability Management

SmartRent will maintain availability for every property.

Availability states:

```text
AVAILABLE
RESERVED
BOOKED
BLOCKED
```

---

# 24. Availability States

## AVAILABLE

The property is available for the selected date.

## RESERVED

A renter has submitted a booking request and the request is awaiting owner approval.

## BOOKED

The booking has been approved.

## BLOCKED

The property owner manually marked the date unavailable.

---

# 25. Owner Availability Management

Property Owners can:

* View availability calendar
* Select dates
* Block dates
* Unblock blocked dates
* Add an optional reason for blocked dates

The owner should not be allowed to unblock dates belonging to an approved booking.

---

# 26. Booking System

Renters can submit booking requests for available properties.

The renter selects:

```text
Property
Rental Mode
Start Date
End Date
Number of Occupants
```

For long-term rentals, the system may additionally request:

```text
Move-in Date
Lease Duration
```

---

# 27. Booking Validation

Before creating a booking, SmartRent should check:

1. User is authenticated.
2. User is a Renter.
3. Property exists.
4. Property is active.
5. Selected rental mode is supported.
6. Start date is valid.
7. End date is after start date.
8. Selected dates are available.
9. Number of occupants is allowed.
10. No conflicting booking exists.

---

# 28. Booking Cost

For short-term rentals:

```text
Estimated Cost =
Number of Nights × Short-Term Price
```

For long-term rentals:

```text
Estimated Cost =
Number of Months × Monthly Price
```

The calculated amount is an estimate because online payments are not included in Version 1.0.

---

# 29. Booking Statuses

Bookings can have the following statuses:

```text
PENDING
APPROVED
REJECTED
CANCELLED
ACTIVE
COMPLETED
```

---

# 30. Booking Request Workflow

```text
Renter selects property
        ↓
Selects dates
        ↓
System checks availability
        ↓
System calculates estimated cost
        ↓
Booking request created
        ↓
PENDING
        ↓
Owner receives request
        ↓
      Decision
      /      \
     /        \
APPROVED    REJECTED
```

---

# 31. Booking Creation

When a valid request is submitted:

1. Create booking.
2. Set booking status to:

```text
PENDING
```

3. Reserve requested dates.
4. Create notification for owner.

---

# 32. Booking Approval

The Property Owner can approve a pending booking.

The system should verify that:

* User is authenticated.
* User owns the property.
* Booking is still pending.
* Dates are still valid.

Then:

```text
Booking:

PENDING
   ↓
APPROVED
```

Availability becomes:

```text
RESERVED
   ↓
BOOKED
```

The renter receives a notification.

---

# 33. Booking Rejection

The owner can reject a pending booking.

The owner may optionally provide a reason.

The booking becomes:

```text
PENDING
   ↓
REJECTED
```

Reserved dates return to:

```text
AVAILABLE
```

The renter receives a notification.

---

# 34. Booking Cancellation

A renter may cancel an eligible booking.

When cancelled:

```text
Booking
   ↓
CANCELLED
```

Associated dates should be released when appropriate.

---

# 35. Preventing Double Bookings

The system must prevent multiple renters from successfully booking the same property for overlapping dates.

Before creating or approving bookings, availability must be checked.

PostgreSQL transactions and database-level rules should be used where necessary to keep booking data consistent.

---

# 36. Long-Term Lease Management

An approved long-term booking may create a Lease.

Lease information:

```text
id
booking_id
property_id
renter_id
owner_id
monthly_rent
start_date
end_date
status
created_at
updated_at
```

---

# 37. Lease Status

Lease statuses:

```text
ACTIVE
COMPLETED
EXPIRED
TERMINATED
```

---

# 38. Lease Expiry Reminder

SmartRent should identify leases approaching expiry.

The system should:

1. Find active leases.
2. Check their end dates.
3. Identify leases expiring within seven days.
4. Notify Renter.
5. Notify Property Owner.
6. Prevent duplicate expiry reminders.

---

# 39. Short-Term Stay Management

Approved short-term bookings can progress through:

```text
APPROVED
    ↓
ACTIVE
    ↓
COMPLETED
```

Completed bookings remain available in rental history.

---

# 40. Messaging

Renters and Property Owners should be able to communicate.

Messages should be associated with a property and optionally a booking.

Recommended message information:

```text
id
sender_id
receiver_id
property_id
booking_id
content
is_read
created_at
```

---

# 41. Messaging Features

Users should be able to:

* View conversations
* Open conversation
* Send message
* Receive message
* View message history
* Mark messages as read

Version 1.0 can use normal database-backed messaging.

**Supabase Realtime may be added** if real-time messaging is needed.

---

# 42. Notifications

SmartRent should provide in-app notifications.

Examples:

```text
BOOKING_REQUEST
BOOKING_APPROVED
BOOKING_REJECTED
BOOKING_CANCELLED
NEW_MESSAGE
LEASE_EXPIRING
SYSTEM_ALERT
```

---

# 43. Notification Information

Each notification should contain:

```text
id
user_id
type
title
message
is_read
created_at
```

Users can:

* View notifications
* Mark notification as read
* Mark all notifications as read

---

# 44. Email Notifications

Email can be used for important events such as:

* Account verification
* Password reset
* Booking request
* Booking approved
* Booking rejected
* Lease expiry

Authentication-related emails can use Supabase Auth email functionality.

Additional application emails can be added later if necessary.

---

# 45. Renter Dashboard

The Renter dashboard should provide quick access to:

* Active bookings
* Pending bookings
* Rental history
* Messages
* Notifications
* Profile

---

# 46. Owner Dashboard

The Property Owner dashboard should display:

## Statistics

* Total Properties
* Active Bookings
* Pending Requests
* Estimated Revenue
* Occupancy

## Property Overview

Display:

* Property
* Rental mode
* Location
* Price
* Status

## Recent Booking Requests

Display:

* Renter
* Property
* Dates
* Rental mode
* Booking status

Owners should be able to approve or reject pending requests.

## Availability

Display property calendar.

## Messages

Display recent conversations.

## Analytics

Display:

* Booking trend
* Estimated revenue
* Occupancy

---

# 47. Owner Analytics

Property Owners can access analytics only for properties they own.

Analytics may include:

* Total bookings
* Pending bookings
* Approved bookings
* Completed bookings
* Occupancy rate
* Estimated revenue
* Most booked properties

Date filtering may include:

```text
This Week
This Month
Last 3 Months
Custom Range
```

---

# 48. Admin Dashboard

The Admin dashboard should contain:

## Platform Statistics

* Total Users
* Total Renters
* Total Owners
* Total Properties
* Active Properties
* Pending Properties
* Total Bookings
* Active Bookings

---

# 49. User Management

Admins can:

* View users
* Search users
* View role
* View status
* Suspend user
* Reactivate user

User statuses:

```text
ACTIVE
SUSPENDED
```

---

# 50. Property Moderation

Admins can:

* View pending properties
* View property details
* Approve property
* Reject property
* Disable active property

Property approval:

```text
PENDING
   ↓
ACTIVE
```

Property rejection:

```text
PENDING
   ↓
REJECTED
```

---

# 51. Admin Analytics

Admin analytics should display high-level platform statistics such as:

* New users
* Number of properties
* Number of bookings
* Active rentals
* Rental activity trends

---

# 52. Database Design

SmartRent uses **Supabase PostgreSQL**.

Recommended application tables:

```text
profiles

properties
property_images

amenities
property_amenities

availability

bookings
leases

messages
notifications
```

Supabase Auth separately manages authentication-related records.

---

# 53. Primary Database Relationships

```text
auth.users
    │
    │ 1:1
    ▼
profiles
    │
    ├─────────────────────────┐
    │                         │
    ▼                         ▼
properties                 bookings
    │                         │
    ├── property_images       │
    ├── amenities             │
    ├── availability          │
    └── bookings ─────────────┘
              │
              ▼
            leases


profiles
    │
    ├── messages
    │
    └── notifications
```

---

# 54. Profiles Table

```text
profiles

id
full_name
phone
role
avatar_url
status
created_at
updated_at
```

`id` corresponds to the authenticated Supabase user's ID.

---

# 55. Properties Table

```text
properties

id
owner_id
title
description
address
city
property_type
bedrooms
bathrooms
max_occupants
short_term_price
monthly_price
rental_mode
status
created_at
updated_at
```

---

# 56. Property Images Table

```text
property_images

id
property_id
storage_path
is_cover
created_at
```

---

# 57. Availability Table

```text
availability

id
property_id
date
status
reason
created_at
```

Status:

```text
AVAILABLE
RESERVED
BOOKED
BLOCKED
```

---

# 58. Bookings Table

```text
bookings

id
property_id
renter_id
rental_mode
start_date
end_date
occupants
estimated_cost
status
rejection_reason
created_at
updated_at
```

---

# 59. Leases Table

```text
leases

id
booking_id
property_id
renter_id
owner_id
monthly_rent
start_date
end_date
status
created_at
updated_at
```

---

# 60. Messages Table

```text
messages

id
sender_id
receiver_id
property_id
booking_id
content
is_read
created_at
```

---

# 61. Notifications Table

```text
notifications

id
user_id
type
title
message
is_read
created_at
```

---

# 62. Supabase Storage

Recommended storage buckets:

```text
property-images
profile-images
```

## Property Images

Used for property listing photos.

## Profile Images

Used for user profile pictures.

Database tables store file paths rather than image binaries.

---

# 63. Row Level Security

Supabase Row Level Security should protect user data.

Examples:

### Properties

Owners can modify only properties where:

```text
owner_id = authenticated user id
```

### Bookings

Renters can access their own booking records.

Owners can access booking records belonging to properties they own.

### Messages

Users can access messages where they are the sender or receiver.

### Notifications

Users can access only their own notifications.

---

# 64. Main Pages

## Public Pages

```text
/
 /properties
 /properties/[id]
```

## Authentication

```text
/login
/register
/forgot-password
```

## Renter

```text
/renter/dashboard
/renter/bookings
/renter/messages
/renter/notifications
/renter/profile
```

## Property Owner

```text
/owner/dashboard
/owner/properties
/owner/properties/new
/owner/properties/[id]
/owner/bookings
/owner/calendar
/owner/messages
/owner/analytics
```

## Administrator

```text
/admin/dashboard
/admin/users
/admin/properties
/admin/bookings
/admin/analytics
```

---

# 65. Suggested Next.js Structure

```text
src/
│
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── renter/
│   ├── owner/
│   ├── admin/
│   └── api/
│
├── components/
│
├── lib/
│   ├── supabase/
│   ├── validation/
│   └── utils/
│
├── services/
│   ├── property.service.ts
│   ├── booking.service.ts
│   ├── availability.service.ts
│   ├── lease.service.ts
│   ├── message.service.ts
│   └── notification.service.ts
│
└── types/
```

The structure should remain simple and can evolve as development continues.

---

# 66. Validation

Use **Zod** for input validation.

Important forms requiring validation include:

* Registration
* Login
* Property creation
* Property editing
* Booking request
* Availability changes
* Messages

Both client-side and server-side validation should be applied where appropriate.

---

# 67. Security Requirements

SmartRent should implement:

* Supabase authentication
* Secure user sessions
* Row Level Security
* Role-based authorization
* Server-side input validation
* Storage access policies
* Protected owner/admin pages
* Secure environment variables
* HTTPS in production

Sensitive Supabase service credentials must never be exposed to the browser.

---

# 68. Performance Requirements

The system should:

* Paginate property search results.
* Optimize property images.
* Avoid unnecessary database requests.
* Index frequently queried columns.
* Fetch only required database fields.
* Keep dashboard queries efficient.

---

# 69. Responsive Design

SmartRent should work on:

* Desktop
* Laptop
* Tablet
* Mobile browser

Tailwind CSS responsive utilities should be used throughout the interface.

---

# 70. User Interface Requirements

The UI should be:

* Simple
* Modern
* Responsive
* Consistent
* Easy to navigate

Users should receive clear feedback for:

* Successful actions
* Validation errors
* Unavailable dates
* Booking status
* Login errors
* Property moderation
* Notifications

---

# 71. MVP Scope

The SmartRent MVP must include:

## Authentication

* Registration
* Login
* Logout
* Email verification
* Password reset
* User roles

## Properties

* Create property
* Edit property
* Property images
* Property amenities
* Property listing
* Search
* Filters
* Property details

## Availability

* Availability calendar
* Block dates
* Unblock dates

## Booking

* Create booking request
* Approve booking
* Reject booking
* Cancel booking
* Prevent conflicting bookings
* Booking history

## Rental Management

* Active rentals
* Long-term leases
* Lease expiry reminder

## Communication

* Messaging
* Notifications

## Owner

* Owner dashboard
* Property management
* Booking management
* Basic analytics

## Admin

* Admin dashboard
* User management
* Property moderation
* Platform analytics

---

# 72. Out of Scope — Version 1.0

The following features are excluded from Version 1.0:

* Online payments
* Automated rent payments
* Security deposit processing
* Native mobile application
* AI recommendations
* AI property pricing
* Digital contract signing
* Advanced accounting
* Third-party rental marketplace integrations
* Complex recommendation algorithms

These features can be considered for future versions.

---

# 73. Development Phases

## Phase 1 — Project Foundation

Implement:

* Next.js
* TypeScript
* Tailwind CSS
* Supabase project
* Authentication
* Profiles
* Roles
* Protected routes

---

## Phase 2 — Property Module

Implement:

* Add Property
* Edit Property
* Property images
* Amenities
* Property status
* Property listing
* Property search
* Property filters
* Property details

---

## Phase 3 — Availability and Booking

Implement:

* Availability calendar
* Block/unblock dates
* Booking request
* Cost calculation
* Booking conflict validation
* Owner booking requests
* Approval
* Rejection
* Cancellation

---

## Phase 4 — Rental Management

Implement:

* Active rentals
* Long-term leases
* Rental history
* Lease expiration handling

---

## Phase 5 — Communication

Implement:

* Messages
* Notifications
* Optional Supabase Realtime messaging

---

## Phase 6 — Dashboards

Implement:

* Renter dashboard
* Owner dashboard
* Owner analytics
* Admin dashboard
* User management
* Property moderation
* Admin analytics

---

## Phase 7 — Testing and Deployment

Perform:

* Authentication testing
* Authorization testing
* Booking conflict testing
* Property workflow testing
* Responsive testing
* Database security testing
* RLS testing
* Final deployment

---

# 74. Primary User Flow

## Renter

```text
Register
   ↓
Login
   ↓
Browse Properties
   ↓
Apply Filters
   ↓
View Property
   ↓
Check Availability
   ↓
Submit Booking
   ↓
Wait For Owner
   ↓
Approved / Rejected
   ↓
Rental
   ↓
Rental History
```

---

# 75. Property Owner Flow

```text
Register
   ↓
Login
   ↓
Add Property
   ↓
Admin Approval
   ↓
Property Active
   ↓
Receive Booking
   ↓
Approve / Reject
   ↓
Manage Rental
   ↓
View Analytics
```

---

# 76. Admin Flow

```text
Login
   ↓
Admin Dashboard
   ↓
Manage Users
   ↓
Moderate Properties
   ↓
Monitor Bookings
   ↓
View Analytics
```

---

# 77. Success Criteria

SmartRent Version 1.0 will be considered successful when:

* Users can securely register and authenticate.
* Property Owners can successfully create properties.
* Admins can approve properties.
* Renters can discover and filter properties.
* Property availability can be viewed.
* Renters can submit booking requests.
* Owners can approve or reject requests.
* Conflicting bookings are prevented.
* Long-term rentals can generate lease records.
* Users can communicate through the platform.
* Users receive important notifications.
* Owners can access property analytics.
* Administrators can manage users and properties.
* The website works correctly across common screen sizes.

---

# 78. Final Technology Stack

| Area             | Technology                       |
| ---------------- | -------------------------------- |
| Frontend         | Next.js                          |
| Language         | TypeScript                       |
| Styling          | Tailwind CSS                     |
| UI Components    | shadcn/ui                        |
| Authentication   | Supabase Auth                    |
| Database         | Supabase PostgreSQL              |
| Storage          | Supabase Storage                 |
| Authorization    | Supabase RLS + Application Roles |
| Validation       | Zod                              |
| Forms            | React Hook Form                  |
| Charts           | Recharts                         |
| Realtime         | Supabase Realtime — Optional     |
| Frontend Hosting | Vercel                           |
| Backend Services | Supabase                         |

---

# 79. Final Architecture

```text
                       SmartRent
                           │
                           ▼
                  ┌────────────────┐
                  │    Next.js     │
                  │   TypeScript   │
                  │ Tailwind CSS   │
                  │   shadcn/ui    │
                  └───────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │    Supabase     │
                 ├─────────────────┤
                 │ Authentication  │
                 │ PostgreSQL      │
                 │ Storage         │
                 │ RLS             │
                 │ Realtime        │
                 └─────────────────┘
```

The design philosophy for SmartRent Version 1.0 is to keep the technical infrastructure simple while focusing development effort on the important rental-management workflows:

**Property Management → Availability → Booking → Approval → Rental/Lease → Communication → Analytics.**
